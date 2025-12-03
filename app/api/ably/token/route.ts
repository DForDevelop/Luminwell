import { NextResponse } from "next/server";
import Ably from "ably";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const clientId = String(session?.user._id);

    const restClient = new Ably.Rest(process.env.ABLY_API_KEY!);

    //token request
    const tokenRequest = await restClient.auth.createTokenRequest({
      clientId,
    });

    return NextResponse.json(tokenRequest);
  } catch (error) {
    return NextResponse.json(
      { error: "Token generation failed" },
      { status: 500 }
    );
  }
}
