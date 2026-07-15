"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

import { LogoMark } from "@/components/ui/logo-mark";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type BasicAssistantChatProps = {
  locale: Locale;
  mode: "page" | "widget";
  onRetryChatKit: () => void;
};

type BasicChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

function createMessage(role: BasicChatMessage["role"], content: string): BasicChatMessage {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    role,
    content,
  };
}

export function BasicAssistantChat({ locale, mode, onRetryChatKit }: BasicAssistantChatProps) {
  const isRomanian = locale === "ro";
  const isWidget = mode === "widget";
  const [messages, setMessages] = useState<BasicChatMessage[]>(() => [
    createMessage(
      "assistant",
      isRomanian
        ? "Buna! Sunt asistentul SyntraFlow. Scrie-mi cu ce te pot ajuta despre AI Assistant, website, hosting, preturi sau demo."
        : "Hello! I am the SyntraFlow assistant. Ask me about the AI Assistant, website, hosting, pricing, or a demo.",
    ),
  ]);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scrollRef.current) {
      return;
    }

    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [isSending, messages]);

  async function sendMessage(text: string) {
    const content = text.trim();

    if (!content || isSending) {
      return;
    }

    const userMessage = createMessage("user", content);
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setDraft("");
    setErrorMessage("");
    setIsSending(true);

    try {
      const response = await fetch("/api/assistant-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locale,
          messages: nextMessages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      });
      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
        text?: string;
      };

      if (!response.ok || !payload.text) {
        throw new Error(
          payload.error ||
            (isRomanian
              ? "Asistentul nu a putut raspunde. Incearca din nou."
              : "The assistant could not reply. Please try again."),
        );
      }

      setMessages((current) => [...current, createMessage("assistant", payload.text as string)]);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : isRomanian
            ? "Asistentul nu a putut raspunde."
            : "The assistant could not reply.",
      );
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(draft);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(draft);
    }
  }

  const prompts = isRomanian
    ? ["Ce poate face AI Assistant?", "Care sunt preturile?", "Vreau un demo"]
    : ["What can the AI Assistant do?", "What are the prices?", "I want a demo"];

  return (
    <div className={cn(isWidget ? "flex h-full min-h-0 flex-col" : "panel-surface rounded-[2rem] p-4 md:p-6")}>
      <section className={cn("flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.5rem] border border-black/8 bg-[#fafaf7]", !isWidget && "h-[40rem]")}>
        <header className="flex items-center justify-between gap-3 border-b border-black/8 bg-white px-4 py-3.5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-black/8 bg-white shadow-sm">
              <LogoMark className="h-7 w-7" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#0b1f35]">SyntraFlow AI Assistant</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-[#4f7d70]">
                <span className="h-2 w-2 rounded-full bg-[#10a37f]" />
                {isRomanian ? "Online - mod simplu" : "Online - simple mode"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onRetryChatKit}
            className="shrink-0 rounded-full border border-black/8 bg-white px-3 py-2 text-[11px] font-semibold text-[#365a78] transition hover:border-[#b8cde1] hover:bg-[#f4f8fc]"
          >
            {isRomanian ? "Reconecteaza" : "Reconnect"}
          </button>
        </header>

        <div ref={scrollRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "max-w-[88%] rounded-[1.25rem] px-4 py-3 text-sm leading-6 shadow-sm",
                message.role === "user"
                  ? "ml-auto bg-[#0f79ff] text-white"
                  : "mr-auto border border-black/8 bg-white text-[#24384c]",
              )}
            >
              {message.content}
            </div>
          ))}

          {isSending ? (
            <div className="mr-auto inline-flex items-center gap-1.5 rounded-[1.25rem] border border-black/8 bg-white px-4 py-3">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#0f79ff]" />
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#0f79ff] [animation-delay:120ms]" />
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#0f79ff] [animation-delay:240ms]" />
            </div>
          ) : null}
        </div>

        <div className="border-t border-black/8 bg-white px-3.5 py-3.5">
          {messages.length === 1 ? (
            <div className="mb-3 flex flex-wrap gap-2">
              {prompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => void sendMessage(prompt)}
                  className="rounded-full border border-[#cfe0f0] bg-[#f4f9ff] px-3 py-1.5 text-xs font-semibold text-[#0b58d0] transition hover:border-[#0f79ff]/35 hover:bg-[#eaf4ff]"
                >
                  {prompt}
                </button>
              ))}
            </div>
          ) : null}

          {errorMessage ? (
            <p className="mb-2 rounded-xl bg-red-50 px-3 py-2 text-xs leading-5 text-red-700">{errorMessage}</p>
          ) : null}

          <form onSubmit={handleSubmit} className="flex items-end gap-2 rounded-[1.2rem] border border-black/10 bg-white p-2 shadow-[0_8px_22px_rgba(15,23,42,0.06)]">
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={isSending}
              placeholder={isRomanian ? "Scrie un mesaj..." : "Write a message..."}
              aria-label={isRomanian ? "Mesaj pentru asistent" : "Message for the assistant"}
              className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-2.5 py-2 text-sm leading-6 text-[#0b1f35] outline-none placeholder:text-[#7d90a2] disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isSending || !draft.trim()}
              aria-label={isRomanian ? "Trimite mesajul" : "Send message"}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#0f79ff] text-white transition hover:bg-[#0b58d0] disabled:cursor-not-allowed disabled:opacity-45"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 12h10" />
                <path d="m12 7 5 5-5 5" />
              </svg>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
