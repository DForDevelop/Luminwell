import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { fileTypeFromBuffer } from "file-type";

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 MB
const ALLOWED_MIME_TYPES = ["image/png", "image/jpg", "image/jpeg"];

export async function POST(request: NextRequest) {
  try {
    // 1. Read the raw FormData directly from the request body
    const formData = await request.formData();

    // CRITICAL: The key "file" must match formData.append("file", file) from the frontend
    const file = formData.get("file");

    // Handle case where no file was uploaded
    if (!file) {
      return NextResponse.json({ url: null });
    }

    const uploadedFile = file as File;

    // 2. Client-side Validation Re-Check (Size)
    if (uploadedFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size limit exceeded (Max 4MB)" },
        { status: 413 }
      );
    }

    // 3. Convert File to a readable buffer for Cloudinary and validation for malicious upload
    const arrayBuffer = await uploadedFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileType = await fileTypeFromBuffer(buffer);

    if (!fileType || !ALLOWED_MIME_TYPES.includes(fileType.mime)) {
      // If fileType is null (unknown) OR the MIME is not in our allowed list
      return NextResponse.json(
        {
          error: `Invalid file content type or format: ${
            fileType?.mime || "unknown"
          }`,
        },
        { status: 400 } // Bad Request
      );
    }
    // 4. Create a Base64 string for upload (Cloudinary's recommended App Router method)
    const base64File = `data:${uploadedFile.type};base64,${buffer.toString(
      "base64"
    )}`;

    // 5. Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64File, {
      resource_type: "image",
      folder: "profile_avatar",
    });

    // SUCCESS: Return the secure URL
    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
