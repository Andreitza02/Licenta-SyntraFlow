"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { LogoMark } from "@/components/ui/logo-mark";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import type { Locale } from "@/lib/i18n";
import type { ChatPreset } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type ChatDemoProps = {
  presets: ChatPreset[];
  storageKey?: string;
  locale?: Locale;
};

type ChatMessage = {
  role: "assistant" | "user";
  text: string;
  timestamp: string;
};

function createTimestamp(locale: Locale) {
  return new Date().toLocaleTimeString(locale === "ro" ? "ro-RO" : "en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ChatDemo({
  presets,
  storageKey = "syntraflow-chat-demo",
  locale = "ro",
}: ChatDemoProps) {
  const [messages, setMessages, isHydrated] = useLocalStorage<ChatMessage[]>(storageKey, [
    {
      role: "assistant",
      text:
        locale === "ro"
          ? "Buna, sunt asistentul virtual SyntraFlow. Pot raspunde la intrebari, pot califica un lead si pot pregati o programare pentru demo."
          : "Hello, I am the SyntraFlow virtual assistant. I can answer questions, qualify a lead, and prepare a demo booking.",
      timestamp: locale === "ro" ? "Acum" : "Now",
    },
  ]);
  const [activeId, setActiveId] = useState<string>(presets[0]?.id ?? "");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const activePreset = useMemo(
    () => presets.find((preset) => preset.id === activeId) ?? presets[0],
    [activeId, presets],
  );

  useEffect(() => {
    if (!scrollRef.current || !isHydrated) {
      return;
    }

    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [isHydrated, isTyping, messages]);

  if (!activePreset) {
    return null;
  }

  function pushPreset(preset: ChatPreset) {
    setActiveId(preset.id);

    const nextMessages: ChatMessage[] = preset.messages.map((message) => ({
      role: message.role,
      text: message.text,
      timestamp: createTimestamp(locale),
    }));

    setMessages((current) => [...current, ...nextMessages.slice(0, 1)]);
    setIsTyping(true);

    window.setTimeout(() => {
      setMessages((current) => [...current, ...nextMessages.slice(1)]);
      setIsTyping(false);
    }, 650);
  }

  const quickReplies =
    locale === "ro"
      ? ["FAQ rapid", "Califica lead", "Confirma date"]
      : ["Quick FAQ", "Qualify lead", "Confirm details"];

  return (
    <div className="mx-auto grid max-w-[60rem] gap-4 xl:grid-cols-[18rem_minmax(0,36rem)] xl:items-stretch xl:justify-center">
      <aside className="reveal-section rounded-[1.75rem] border border-black/8 bg-[#fafaf7] p-3.5 shadow-[0_18px_42px_rgba(15,23,42,0.06)] xl:flex xl:h-full xl:flex-col xl:overflow-hidden">
        <div className="rounded-[1.35rem] border border-black/8 bg-white px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#10a37f]">
            {locale === "ro" ? "Prompturi sugerate" : "Suggested prompts"}
          </p>
          <h3 className="mt-3 text-lg font-semibold tracking-[-0.03em] text-[#111827]">
            {locale === "ro" ? "Porneste un scenariu de conversatie" : "Start a conversation scenario"}
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#4b5563]">
            {locale === "ro"
              ? "Alege un scenariu si vezi cum asistentul deschide conversatia, cere context si pregateste pasul urmator."
              : "Choose a scenario and see how the assistant opens the conversation, asks for context, and prepares the next step."}
          </p>
        </div>

        <div className="mt-4 space-y-3 xl:min-h-0 xl:flex-1 xl:overflow-y-auto xl:pr-1">
          {presets.map((preset) => {
            const isActive = preset.id === activePreset.id;

            return (
              <button
                key={preset.id}
                type="button"
                className={cn(
                  "w-full rounded-[1.3rem] border px-3.5 py-3.5 text-left transition",
                  isActive
                    ? "border-[#b7e5d6] bg-[#eefaf4] shadow-[0_14px_32px_rgba(16,163,127,0.08)]"
                    : "border-black/8 bg-white hover:border-[#cfd8e3] hover:bg-[#fcfcfa]",
                )}
                onClick={() => pushPreset(preset)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[13px] font-semibold leading-6 text-[#111827]">{preset.prompt}</p>
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#10a37f]">
                      {preset.focus}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold",
                      isActive
                        ? "border-[#10a37f]/20 bg-white text-[#10a37f]"
                        : "border-black/8 bg-[#fafaf7] text-[#6b7280]",
                    )}
                  >
                    {isActive ? "ON" : "GO"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-4 rounded-[1.3rem] border border-black/8 bg-white px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#10a37f]">
            {locale === "ro" ? "Date colectate" : "Collected data"}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {activePreset.collectedData.map((item) => (
              <span
                key={item}
                className="rounded-full border border-black/8 bg-[#fafaf7] px-3 py-2 text-xs font-medium text-[#374151]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-[1.3rem] border border-[#d8ebe4] bg-[#eefaf4] px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#10a37f]">
            {locale === "ro" ? "Flux ghidat" : "Guided flow"}
          </p>
          <p className="mt-3 text-sm leading-6 text-[#285245]">
            {locale === "ro"
              ? "FAQ -> calificare lead -> confirmare. Demo-ul ramane local in browser, dar interfata urmareste structura unei experiente ChatKit reale."
              : "FAQ -> lead qualification -> confirmation. The demo stays local in the browser, but the interface follows the structure of a real ChatKit experience."}
          </p>
        </div>
      </aside>

      <section className="reveal-section mx-auto flex w-full max-w-[36rem] flex-col overflow-hidden rounded-[1.75rem] border border-black/8 bg-[#fafaf7] shadow-[0_20px_48px_rgba(15,23,42,0.08)] xl:aspect-square">
        <div className="border-b border-black/8 px-4 py-3.5 md:px-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-black/8 bg-white shadow-[0_8px_18px_rgba(15,23,42,0.06)]">
                <LogoMark className="h-7 w-7" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#10a37f]">
                  {locale === "ro" ? "Demo conversational" : "Conversation demo"}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-[#111827]">
                  SyntraFlow AI Assistant
                </h3>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-3 py-2 text-xs font-medium text-[#374151]">
              <span className="h-2 w-2 rounded-full bg-[#10a37f]" />
              Online
            </div>
          </div>
        </div>

        <div className="grid min-h-[32rem] flex-1 xl:min-h-0 xl:grid-cols-[minmax(0,1fr)_11.5rem]">
          <div className="flex min-h-0 flex-col">
            <div
              ref={scrollRef}
              className="min-h-0 flex-1 space-y-3.5 overflow-y-auto px-4 py-4 md:px-5"
            >
              {!isHydrated ? (
                <>
                  <div className="flex items-end gap-3">
                    <div className="h-8 w-8 animate-pulse rounded-2xl bg-white" />
                    <div className="h-18 w-[75%] animate-pulse rounded-[1.4rem] border border-black/6 bg-white" />
                  </div>
                  <div className="ml-auto h-14 w-[65%] animate-pulse rounded-[1.4rem] border border-[#d8ebe4] bg-[#eefaf4]" />
                </>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={`${message.timestamp}-${index}`}
                    className={cn(
                      "max-w-[92%]",
                      message.role === "user" ? "ml-auto" : "mr-auto",
                    )}
                  >
                    {message.role === "assistant" ? (
                      <div className="flex items-end gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl border border-black/8 bg-white">
                          <LogoMark className="h-5 w-5" />
                        </div>
                        <div className="rounded-[1.35rem] border border-black/8 bg-white px-3.5 py-3 text-sm leading-6 text-[#1f2937] shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
                          <p>{message.text}</p>
                          <p className="mt-2 text-[11px] text-[#6b7280]">{message.timestamp}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-[1.35rem] border border-[#c9e9dc] bg-[#e8f8f2] px-3.5 py-3 text-sm leading-6 text-[#174236] shadow-[0_10px_24px_rgba(16,163,127,0.06)]">
                        <p>{message.text}</p>
                        <p className="mt-2 text-[11px] text-[#4f7d70]">{message.timestamp}</p>
                      </div>
                    )}
                  </div>
                ))
              )}

              {isTyping ? (
                <div className="mr-auto flex items-end gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl border border-black/8 bg-white">
                    <LogoMark className="h-5 w-5" />
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-[1.3rem] border border-black/8 bg-white px-3.5 py-3 text-sm text-[#6b7280]">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#10a37f]" />
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#10a37f] [animation-delay:120ms]" />
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#10a37f] [animation-delay:240ms]" />
                  </div>
                </div>
              ) : null}
            </div>

            <div className="border-t border-black/8 bg-white/74 px-4 py-3.5 md:px-5">
              <div className="mb-3 flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    className="rounded-full border border-black/8 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-[#374151] transition hover:border-[#b7e5d6] hover:bg-[#eefaf4] hover:text-[#10a37f]"
                    onClick={() =>
                      setMessages((current) => [
                        ...current,
                        { role: "user", text: reply, timestamp: createTimestamp(locale) },
                      ])
                    }
                  >
                    {reply}
                  </button>
                ))}
              </div>

              <div className="rounded-[1.35rem] border border-black/10 bg-white p-2 shadow-[0_10px_22px_rgba(15,23,42,0.04)]">
                <div className="flex items-end gap-2">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-black/8 bg-[#f5f5ef] text-[#9ca3af]">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                  </div>
                  <div className="min-h-10 flex-1 rounded-2xl bg-transparent px-2 py-2 text-sm text-[#9ca3af]">
                    {locale === "ro" ? "Scrie un mesaj..." : "Write a message..."}
                  </div>
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#10a37f] text-white shadow-[0_10px_22px_rgba(16,163,127,0.2)]">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 12h10" />
                      <path d="m12 7 5 5-5 5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="border-t border-black/8 bg-[#f3f4ee] px-4 py-4 xl:border-l xl:border-t-0">
            <div className="rounded-[1.2rem] border border-black/8 bg-white px-3.5 py-3.5">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#10a37f]">
                {locale === "ro" ? "Sesiune activa" : "Active session"}
              </p>
              <p className="mt-2.5 text-[13px] font-semibold leading-6 text-[#111827]">{activePreset.prompt}</p>
              <p className="mt-2 text-sm leading-6 text-[#4b5563]">
                {activePreset.focus}
              </p>
            </div>

            <div className="mt-3 rounded-[1.2rem] border border-black/8 bg-white px-3.5 py-3.5">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#10a37f]">
                {locale === "ro" ? "Structura demo" : "Demo structure"}
              </p>
              <ul className="mt-3 space-y-2.5 text-sm text-[#374151]">
                {(locale === "ro"
                  ? [
                      "Deschidere de conversatie",
                      "Colectare context relevant",
                      "Clarificare intentie",
                      "Pregatire pas urmator",
                    ]
                  : [
                      "Conversation opening",
                      "Relevant context collection",
                      "Intent clarification",
                      "Next-step preparation",
                    ]).map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#10a37f]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-3 text-xs leading-5 text-[#6b7280]">
              {locale === "ro"
                ? "Nota privacy: datele din demo raman locale in browser si nu sunt trimise mai departe."
                : "Privacy note: demo data stays local in the browser and is not sent anywhere else."}
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
}
