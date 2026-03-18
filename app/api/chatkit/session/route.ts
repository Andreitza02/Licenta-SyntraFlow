import { NextResponse } from "next/server";
import OpenAI from "openai";

import { chatKitConfig } from "@/lib/chatkit-config";

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY nu este configurat pe server." },
      { status: 500 },
    );
  }

  if (!chatKitConfig.workflowId) {
    return NextResponse.json(
      { error: "OPENAI_CHATKIT_WORKFLOW_ID nu este configurat pe server." },
      { status: 500 },
    );
  }

  try {
    const body = (await request.json().catch(() => ({}))) as {
      user?: unknown;
      userId?: unknown;
    };
    const requestedUser =
      typeof body.user === "string" && body.user.trim().length > 0
        ? body.user.trim()
        : typeof body.userId === "string" && body.userId.trim().length > 0
          ? body.userId.trim()
        : null;

    const client = new OpenAI({ apiKey });
    const session = await client.beta.chatkit.sessions.create({
      user: requestedUser ?? `syntraflow-${crypto.randomUUID()}`,
      workflow: {
        id: chatKitConfig.workflowId,
        tracing: { enabled: true },
      },
      chatkit_configuration: {
        automatic_thread_titling: { enabled: true },
        history: { enabled: true, recent_threads: 12 },
      },
      expires_after: {
        anchor: "created_at",
        seconds: 60 * 10,
      },
      rate_limits: {
        max_requests_per_1_minute: 20,
      },
    });

    return NextResponse.json({
      clientSecret: session.client_secret,
      client_secret: session.client_secret,
      sessionId: session.id,
      expiresAt: session.expires_at,
    });
  } catch (error) {
    const statusCode =
      typeof (error as { status?: unknown })?.status === "number"
        ? (error as { status: number }).status
        : 500;
    const message =
      error instanceof Error ? error.message : "Nu s-a putut crea sesiunea ChatKit.";

    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
