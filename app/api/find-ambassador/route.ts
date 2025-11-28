import { NextResponse } from "next/server";
import dbConnection from "@/lib/dbConnection";
import UserModel from "@/model/User";
import { generateObject } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";

export async function POST(req: Request) {
  await dbConnection();

  try {
    const { userInput } = await req.json();

    if (!userInput) {
      return NextResponse.json({ success: false, message: "Missing Input" });
    }

    const ambassadors = await UserModel.find({ role: "ambassador" })
      .select("_id username categories description")
      .lean();

    if (!ambassadors.length) {
      return NextResponse.json({
        success: false,
        message: "no ambassador found",
      });
    }

    const ambassadorList = ambassadors.map((a) => ({
      id: a._id.toString(),
      name: a.username,
      categories: a.categories,
      description: a.description,
    }));

    //info: This is the core feature which is AI-MatchMaking selection...
    //this will check self harm content

    const matchSchema = z.object({
      ambassadorId: z.string(),
      ambassadorName: z.string(),
      category: z.array(z.string()),
      description: z.string(),
      confidence: z.number(),
      reason: z.string().optional(), // optional if you want
    });

    const google = createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_API_KEY!,
    });

    const result = await generateObject({
      model: google("gemini-2.0-flash"),
      schema: matchSchema,
      system: `
    You are an expert mental wellness matchmaking engine.

    Your responsibilities:
    - Understand the user's emotional or psychological concern.
    - Analyze the list of ambassadors.
    - Select ONLY the most suitable ambassador.
    - Always prioritize emotional safety, accuracy, and ethics.

    🚨 Self-Harm Safety Rules:
    If the user expresses:
      - suicidal intent
      - desire to self-harm
      - statements such as "I want to die", "I can't continue", "I want to hurt myself",
      - or any direct crisis indicators
    THEN:
      - Do NOT assign an ambassador.
      - Instead return:
          ambassadorId: "none"
          ambassadorName: "none"
          category: ["crisis"]
          description: "The user may be in crisis and needs immediate safety resources."
          confidence: 0
          reason: "Detected possible self-harm or crisis intent."
      - STOP further matching.

    Matching Rules:
    1. You must analyze the user's problem deeply.
    2. Compare it with each ambassador’s category/expertise.
    3. Choose ONLY ONE ambassador with the strongest category match.
    4. If multiple seem similar, pick the best fit with highest relevance.
    5. Confidence must be between 0 and 1.
    6. Never invent ambassadors that are not in the list.
    7. If no good match exists, still choose one with low confidence.

    Output Rules:
    - You MUST return ONLY a JSON object.
    - Exactly these fields:
        ambassadorId (string)
        ambassadorName (string)
        category (array of strings)
        description (string)
        confidence (number)
        reason (string, optional)
  `,
      prompt: `
    User problem:
    "${userInput}"

    Ambassador list:
    ${JSON.stringify(ambassadorList, null, 2)}

    Select the best single ambassador following all rules.
  `,
      providerOptions: {
        google: {
          safetySettings: [
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_ONLY_HIGH",
            },
          ],
        },
      },
    });

    console.log(result.object);
    return NextResponse.json({
      success: true,
      match: result.object,
    });
  } catch (error) {
    console.error("failed due to", error);
    return NextResponse.json(
      { success: false, message: "Matchmaking Failed due to Internal error" },
      { status: 500 }
    );
  }
}
