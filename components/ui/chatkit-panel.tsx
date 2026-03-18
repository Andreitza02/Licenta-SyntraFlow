"use client";

import type { ChatKitOptions } from "@openai/chatkit";
import { createElement, useEffect, useRef, useState } from "react";

import { useToast } from "@/components/providers/toast-provider";
import { LogoMark } from "@/components/ui/logo-mark";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type ChatKitPanelProps = {
  enabled: boolean;
  workflowId: string;
  mode?: "page" | "widget";
  locale?: Locale;
};

type OpenAIChatKitElement = HTMLElement & {
  setOptions: (options: ChatKitOptions) => void;
};

function collectShadowRoots(root: ParentNode, found = new Set<ShadowRoot>()) {
  const elements = "querySelectorAll" in root ? Array.from(root.querySelectorAll("*")) : [];

  for (const element of elements) {
    const host = element as Element & { shadowRoot?: ShadowRoot | null };

    if (host.shadowRoot && !found.has(host.shadowRoot)) {
      found.add(host.shadowRoot);
      collectShadowRoots(host.shadowRoot, found);
    }
  }

  return Array.from(found);
}

function applyWidgetComposerFix(chatEl: OpenAIChatKitElement | null) {
  const root = chatEl?.shadowRoot;

  if (!root) {
    return;
  }

  const roots = [root, ...collectShadowRoots(root)];

  for (const activeRoot of roots) {
    let styleTag = activeRoot.querySelector("style[data-syntraflow-chatkit-fix]") as HTMLStyleElement | null;

    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.setAttribute("data-syntraflow-chatkit-fix", "true");
      activeRoot.appendChild(styleTag);
    }

    styleTag.textContent = `
      textarea,
      input,
      [contenteditable="true"] {
        color: #0b1f35 !important;
        caret-color: #0b1f35 !important;
        background: transparent !important;
      }

      textarea::placeholder,
      input::placeholder {
        color: #6b7280 !important;
      }
    `;

    const inputs = activeRoot.querySelectorAll(
      'textarea, input[type="text"], input:not([type]), [contenteditable="true"]',
    );

    inputs.forEach((node) => {
      const composerInput = node as HTMLElement;
      composerInput.style.color = "#0b1f35";
      composerInput.style.caretColor = "#0b1f35";
      composerInput.style.background = "transparent";

      let current = composerInput.parentElement;

      for (let level = 0; current && level < 5; level += 1) {
        if (level <= 2) {
          current.style.background = "#ffffff";
          current.style.color = "#0b1f35";
          current.style.boxShadow = "none";
        }

        if (level === 1 || level === 2) {
          current.style.borderRadius = "18px";
          current.style.border = "1px solid rgba(13, 51, 88, 0.08)";
        }

        current = current.parentElement;
      }
    });
  }
}

function getOrCreateUserId() {
  const key = "syntraflow-chat-user";
  const existing =
    typeof window !== "undefined" ? window.localStorage.getItem(key) : null;

  if (existing) {
    return existing;
  }

  const nextId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `guest_${Date.now()}`;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, nextId);
  }

  return nextId;
}

function buildChatKitOptions(isWidget: boolean, locale: Locale): ChatKitOptions {
  return {
    frameTitle: "SyntraFlow Assistant",
    api: {
      async getClientSecret() {
        const response = await fetch("/api/chatkit-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: getOrCreateUserId(),
          }),
        });

        const payload = (await response.json().catch(() => ({}))) as {
          client_secret?: string;
          error?: string;
        };

        if (!response.ok || !payload.client_secret) {
          throw new Error(
            payload.error || (locale === "ro"
              ? "Sesiunea ChatKit nu a putut fi initializata."
              : "The ChatKit session could not be initialized."),
          );
        }

        return payload.client_secret;
      },
    },
    theme: {
      colorScheme: "light",
      radius: "pill",
      density: "normal",
      typography: {
        baseSize: 16,
        fontFamily:
          '"OpenAI Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
        fontFamilyMono:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
        fontSources: [
          {
            family: "OpenAI Sans",
            src: "https://cdn.openai.com/common/fonts/openai-sans/v2/OpenAISans-Regular.woff2",
            weight: 400,
            style: "normal",
            display: "swap",
          },
          {
            family: "OpenAI Sans",
            src: "https://cdn.openai.com/common/fonts/openai-sans/v2/OpenAISans-Medium.woff2",
            weight: 500,
            style: "normal",
            display: "swap",
          },
          {
            family: "OpenAI Sans",
            src: "https://cdn.openai.com/common/fonts/openai-sans/v2/OpenAISans-Semibold.woff2",
            weight: 600,
            style: "normal",
            display: "swap",
          },
          {
            family: "OpenAI Sans",
            src: "https://cdn.openai.com/common/fonts/openai-sans/v2/OpenAISans-Bold.woff2",
            weight: 700,
            style: "normal",
            display: "swap",
          },
          {
            family: "OpenAI Sans",
            src: "https://cdn.openai.com/common/fonts/openai-sans/v2/OpenAISans-RegularItalic.woff2",
            weight: 400,
            style: "italic",
            display: "swap",
          },
          {
            family: "OpenAI Sans",
            src: "https://cdn.openai.com/common/fonts/openai-sans/v2/OpenAISans-MediumItalic.woff2",
            weight: 500,
            style: "italic",
            display: "swap",
          },
          {
            family: "OpenAI Sans",
            src: "https://cdn.openai.com/common/fonts/openai-sans/v2/OpenAISans-SemiboldItalic.woff2",
            weight: 600,
            style: "italic",
            display: "swap",
          },
          {
            family: "OpenAI Sans",
            src: "https://cdn.openai.com/common/fonts/openai-sans/v2/OpenAISans-BoldItalic.woff2",
            weight: 700,
            style: "italic",
            display: "swap",
          },
        ],
      },
      color: {
        accent: {
          primary: "#10a37f",
          level: 3,
        },
      },
    },
    header: isWidget
      ? {
          enabled: false,
        }
      : {
          title: {
            enabled: true,
            text: locale === "ro" ? "Asistent SyntraFlow" : "SyntraFlow Assistant",
          },
        },
    composer: {
      placeholder: locale === "ro" ? "Scrie un mesaj..." : "Write a message...",
      attachments: {
        enabled: true,
        maxCount: 5,
        maxSize: 10 * 1024 * 1024,
      },
      tools: [
        {
          id: "search_docs",
          label: "Search docs",
          shortLabel: "Docs",
          placeholderOverride: "Search documentation",
          icon: "book-open",
          pinned: false,
        },
        {
          id: "program_demo",
          label: locale === "ro" ? "Programare demo" : "Book demo",
          shortLabel: "Demo",
          placeholderOverride: locale === "ro" ? "Solicita o programare" : "Request a booking",
          icon: "calendar",
          pinned: false,
        },
      ],
    },
    startScreen: {
      greeting: "",
      prompts: [],
    },
    history: {
      enabled: !isWidget,
      showDelete: true,
      showRename: true,
    },
  };
}

export function ChatKitPanel({
  enabled,
  workflowId,
  mode = "page",
  locale = "ro",
}: ChatKitPanelProps) {
  const { pushToast } = useToast();
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const chatRef = useRef<OpenAIChatKitElement | null>(null);
  const initRef = useRef(false);
  const isWidget = mode === "widget";
  const isRomanian = locale === "ro";

  useEffect(() => {
    if (!enabled || initRef.current) {
      return;
    }

    const chatEl = chatRef.current;

    if (!chatEl) {
      return;
    }

    let cancelled = false;
    initRef.current = true;
    setStatus("loading");
    setErrorMessage("");

    const onReady = () => {
      if (cancelled) {
        return;
      }

      if (isWidget) {
        applyWidgetComposerFix(chatRef.current);
        window.setTimeout(() => applyWidgetComposerFix(chatRef.current), 150);
        window.setTimeout(() => applyWidgetComposerFix(chatRef.current), 600);
      }

      setStatus("ready");
      setErrorMessage("");
    };

    const onError = (event: Event) => {
      if (cancelled) {
        return;
      }

      const detail = (event as CustomEvent<{ error?: Error }>).detail;
      const message =
        detail?.error instanceof Error
          ? detail.error.message
          : isRomanian
            ? "ChatKit a raportat o eroare."
            : "ChatKit reported an error.";

      setStatus("error");
      setErrorMessage(message);
      pushToast({
        tone: "error",
        title: isRomanian ? "ChatKit indisponibil" : "ChatKit unavailable",
        description: message,
      });
    };

    chatEl.addEventListener("chatkit.ready", onReady);
    chatEl.addEventListener("chatkit.error", onError);

    async function initChatKit() {
      try {
        await customElements.whenDefined("openai-chatkit");

        if (cancelled || !chatRef.current) {
          return;
        }

        const options = buildChatKitOptions(isWidget, locale);

        chatRef.current.setOptions(options);
      } catch (error) {
        if (cancelled) {
          return;
        }

        const message =
          error instanceof Error
            ? error.message
            : isRomanian
              ? "ChatKit nu a putut fi initializat."
              : "ChatKit could not be initialized.";

        setStatus("error");
        setErrorMessage(message);
        pushToast({
          tone: "error",
          title: isRomanian ? "Initializare esuata" : "Initialization failed",
          description: message,
        });
      }
    }

    void initChatKit();

    return () => {
      cancelled = true;
      chatEl.removeEventListener("chatkit.ready", onReady);
      chatEl.removeEventListener("chatkit.error", onError);
    };
  }, [enabled, isWidget, locale, isRomanian, pushToast]);

  useEffect(() => {
    if (!enabled) {
      initRef.current = false;
      setStatus("idle");
      setErrorMessage("");
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !chatRef.current) {
      return;
    }

    let cancelled = false;

    async function syncOptions() {
      await customElements.whenDefined("openai-chatkit");

      if (cancelled || !chatRef.current) {
        return;
      }

      chatRef.current.setOptions(buildChatKitOptions(isWidget, locale));

      if (isWidget) {
        window.setTimeout(() => applyWidgetComposerFix(chatRef.current), 0);
        window.setTimeout(() => applyWidgetComposerFix(chatRef.current), 250);
      }
    }

    void syncOptions();

    return () => {
      cancelled = true;
    };
  }, [enabled, isWidget, locale]);

  const shellClassName = isWidget
    ? "flex h-full min-h-0 flex-col rounded-[1.5rem] bg-[#fafaf7]"
    : "panel-surface reveal-section rounded-[2rem] p-4 md:p-6";

  return (
    <div className={shellClassName}>
      {!isWidget ? (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#10a37f]">
              OpenAI ChatKit
            </p>
            <p className="mt-2 text-sm text-muted">
              {isRomanian ? "Workflow activ" : "Active workflow"}: {workflowId}
            </p>
          </div>
          <div className="rounded-full bg-[#f3f4f6] px-3 py-2 text-xs font-semibold text-[#374151]">
            {status === "loading" && (isRomanian ? "Se initializeaza sesiunea..." : "Initializing session...")}
            {status === "ready" && (isRomanian ? "ChatKit activ" : "ChatKit active")}
            {status === "error" && (isRomanian ? "Eroare de conectare" : "Connection error")}
            {status === "idle" && (isRomanian ? "Pregatit pentru initializare" : "Ready to initialize")}
          </div>
        </div>
      ) : null}

      <div
        className={cn(
          "relative flex flex-col overflow-hidden rounded-[1.5rem] border border-black/8 bg-[#fafaf7]",
          isWidget ? "h-full min-h-0 flex-1" : "",
        )}
      >
        {isWidget ? (
          <div className="syntraflow-chatkit-topbar border-b border-[#0d3358]/8 px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/60 bg-white/76 shadow-[0_10px_22px_rgba(11,31,53,0.08)] backdrop-blur-sm">
                  <LogoMark className="h-8 w-8" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold text-[#0b1f35]">
                    {isRomanian ? "Asistent SyntraFlow" : "SyntraFlow Assistant"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div
          className={cn(
            "relative min-h-0 flex-1 bg-[#fafaf7]",
            !isWidget && "h-[40rem]",
          )}
        >
          {!enabled ? (
            <div className="flex min-h-0 flex-1 items-center justify-center px-5 py-6 text-center text-sm leading-7 text-[#4b5563]">
              {isRomanian
                ? "ChatKit nu este configurat. Adauga cheia OpenAI si workflow-ul pentru a porni asistentul."
                : "ChatKit is not configured. Add the OpenAI key and workflow to start the assistant."}
            </div>
          ) : null}

          {status !== "ready" && enabled ? (
            <div className="pointer-events-none absolute inset-0 z-[1] flex min-h-0 flex-1 flex-col justify-between bg-[#fafaf7]">
              <div className="flex min-h-0 flex-1 flex-col justify-center gap-5 px-5 py-6">
                <div className="rounded-3xl border border-black/6 bg-white px-5 py-5">
                  <p className="text-sm font-medium text-[#111827]">
                    {status === "error"
                      ? (isRomanian ? "ChatKit nu a pornit" : "ChatKit did not start")
                      : (isRomanian ? "Asistentul se conecteaza" : "The assistant is connecting")}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#4b5563]">
                    {status === "error"
                      ? errorMessage
                      : isRomanian
                        ? "Interfata se pregateste si va afisa conversatia imediat ce ChatKit devine activ."
                        : "The interface is getting ready and will display the conversation as soon as ChatKit becomes active."}
                  </p>
                </div>
                <div className="rounded-[1.55rem] border border-black/10 bg-white p-2">
                  <div className="flex items-end gap-2">
                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-black/8 bg-[#f5f5ef] text-[#9ca3af]">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 5v14" />
                        <path d="M5 12h14" />
                      </svg>
                    </div>
                    <div className="min-h-11 flex-1 rounded-2xl bg-transparent px-2 py-2 text-sm text-[#9ca3af]">
                      {isRomanian ? "Scrie un mesaj..." : "Write a message..."}
                    </div>
                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#9ca3af] text-white">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 12h10" />
                        <path d="m12 7 5 5-5 5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {createElement("openai-chatkit", {
            ref: (node: OpenAIChatKitElement | null) => {
              chatRef.current = node;
            },
            className: "block h-full w-full bg-[#fafaf7]",
          })}
        </div>
      </div>
    </div>
  );
}
