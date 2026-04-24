import { NextResponse } from "next/server";
import OpenAI from "openai";

type AssistantRequestMessage = {
  role?: unknown;
  content?: unknown;
};

function normalizeMessages(messages: unknown) {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .filter((message): message is AssistantRequestMessage => Boolean(message && typeof message === "object"))
    .map((message) => ({
      role: message.role === "assistant" ? "assistant" : "user",
      content: typeof message.content === "string" ? message.content.trim() : "",
    }))
    .filter((message) => message.content.length > 0)
    .slice(-12);
}

function buildConversationPrompt(
  messages: ReturnType<typeof normalizeMessages>,
  locale: "ro" | "en",
) {
  const transcript = messages
    .map((message) => `${message.role === "assistant" ? "Assistant" : "Visitor"}: ${message.content}`)
    .join("\n\n");

  return locale === "ro"
    ? `Continua conversatia de mai jos ca asistent SyntraFlow. Raspunde doar cu urmatorul mesaj al asistentului, fara prefixe.

Conversatie:
${transcript}

Raspunsul asistentului:`
    : `Continue the conversation below as the SyntraFlow assistant. Reply only with the assistant's next message, with no prefixes.

Conversation:
${transcript}

Assistant reply:`;
}

function buildInstructions(locale: "ro" | "en") {
  return locale === "ro"
    ? `Esti asistentul comercial SyntraFlow pentru website-ul companiei.

Produse si preturi:
- Custom AI Assistant: 1000 EUR pentru setup initial.
- Website Builder: 500 EUR pret orientativ pentru website de prezentare.
- Website Hosting: 50 EUR pe luna pentru gazduire website.

Comportament:
- Raspunde clar, cald si concis.
- Explica diferentele dintre produse si recomanda combinatii cand are sens.
- Ajuta utilizatorul cu preturi, potrivire, urmatorul pas, demo sau contact.
- Nu inventa studii de caz, functionalitati sau garantii care nu au fost confirmate.
- Daca exista incertitudine, spune clar si directioneaza catre contact sau demo.
- Mentine raspunsurile scurte, usor de citit, orientate spre vanzare si utile pentru site.`
    : `You are the SyntraFlow sales assistant for the company website.

Products and pricing:
- Custom AI Assistant: EUR 1000 for the initial setup.
- Website Builder: EUR 500 guide price for a presentation website.
- Website Hosting: EUR 50 per month for website hosting.

Behavior:
- Reply clearly, warmly, and concisely.
- Explain the difference between products and recommend bundles when useful.
- Help the visitor with pricing, fit, next steps, demo, or contact questions.
- Do not invent case studies, capabilities, or guarantees that were not confirmed.
- If something is uncertain, say so clearly and route the visitor toward contact or a demo.
- Keep replies short, easy to scan, sales-aware, and helpful for a live website chat.`;
}

function extractText(response: { output_text?: unknown; output?: unknown }) {
  if (typeof response.output_text === "string" && response.output_text.trim().length > 0) {
    return response.output_text.trim();
  }

  if (!Array.isArray(response.output)) {
    return "";
  }

  const text = response.output
    .flatMap((item) => {
      if (!item || typeof item !== "object" || !("content" in item)) {
        return [];
      }

      const content = (item as { content?: unknown }).content;
      return Array.isArray(content) ? content : [];
    })
    .flatMap((contentItem) => {
      if (!contentItem || typeof contentItem !== "object") {
        return [];
      }

      const type = "type" in contentItem ? (contentItem as { type?: unknown }).type : undefined;
      const textValue = "text" in contentItem ? (contentItem as { text?: unknown }).text : undefined;

      return type === "output_text" && typeof textValue === "string" && textValue.trim().length > 0
        ? [textValue.trim()]
        : [];
    })
    .join("\n")
    .trim();

  return text;
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY nu este configurat pe server." },
      { status: 500 },
    );
  }

  try {
    const body = (await request.json().catch(() => ({}))) as {
      locale?: unknown;
      messages?: unknown;
    };
    const locale = body.locale === "en" ? "en" : "ro";
    const messages = normalizeMessages(body.messages);

    if (messages.length === 0) {
      return NextResponse.json(
        { error: locale === "ro" ? "Nu exista mesaje pentru procesare." : "There are no messages to process." },
        { status: 400 },
      );
    }

    const client = new OpenAI({ apiKey });
    const model = process.env.OPENAI_ASSISTANT_MODEL || "gpt-4.1-mini";
    const response = await client.responses.create({
      model,
      instructions: buildInstructions(locale),
      max_output_tokens: 320,
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: buildConversationPrompt(messages, locale),
            },
          ],
        },
      ],
    });

    const text = extractText(response);

    if (!text) {
      throw new Error(
        locale === "ro"
          ? "Asistentul nu a returnat continut."
          : "The assistant did not return any content.",
      );
    }

    return NextResponse.json({ text });
  } catch (error) {
    const statusCode =
      typeof (error as { status?: unknown })?.status === "number"
        ? (error as { status: number }).status
        : 500;
    const message =
      error instanceof Error ? error.message : "Asistentul nu a putut genera un raspuns.";

    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
