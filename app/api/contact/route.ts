import { NextResponse } from "next/server";

import { saveContactSubmission, validateContactSubmissionPayload } from "@/lib/contact-submissions";

function getLocale(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return "ro" as const;
  }

  return (payload as { locale?: unknown }).locale === "en" ? "en" as const : "ro" as const;
}

function getIpAddress(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || null;
  }

  return request.headers.get("x-real-ip");
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const locale = getLocale(payload);

  if (!payload || typeof payload !== "object") {
    return NextResponse.json(
      {
        error:
          locale === "ro"
            ? "Cererea trimisa nu este valida."
            : "The submitted request is not valid.",
      },
      { status: 400 },
    );
  }

  const requestBody = payload as Record<string, unknown>;
  const honeypot = typeof requestBody.website === "string" ? requestBody.website.trim() : "";

  if (honeypot.length > 0) {
    return NextResponse.json({ success: true }, { status: 202 });
  }

  const validation = validateContactSubmissionPayload(requestBody);

  if (!validation.ok) {
    return NextResponse.json(
      {
        error: validation.error,
        fieldErrors: validation.fieldErrors,
      },
      { status: 400 },
    );
  }

  try {
    await saveContactSubmission(validation.data, {
      ipAddress: getIpAddress(request),
      referrer: request.headers.get("referer"),
      submittedAt: new Date().toISOString(),
      userAgent: request.headers.get("user-agent"),
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Failed to save contact submission", error);

    return NextResponse.json(
      {
        error:
          locale === "ro"
            ? "Solicitarea nu a putut fi trimisa momentan. Incearca din nou."
            : "The request could not be sent right now. Please try again.",
      },
      { status: 500 },
    );
  }
}
