"use client";

import { ChatKit, useChatKit } from "@openai/chatkit-react";
import { useEffect, useState } from "react";

import { useToast } from "@/components/providers/toast-provider";
import { BasicAssistantChat } from "@/components/ui/basic-assistant-chat";
import { LogoMark } from "@/components/ui/logo-mark";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type ChatKitPanelProps = {
  enabled: boolean;
  mode?: "page" | "widget";
  locale?: Locale;
  workflowId?: string;
};

const CHATKIT_ELEMENT_NAME = "openai-chatkit";
const CHATKIT_SCRIPT_URL = "/api/chatkit/cdn/deployments/chatkit/chatkit.js?v=uuid-fix-1";

type ChatKitScriptStatus = "loading" | "ready" | "error";

function ensureRandomUuid() {
  if (typeof window.crypto.randomUUID === "function") {
    return;
  }

  const randomUUID = () => {
    const bytes = new Uint8Array(16);
    window.crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 15) | 64;
    bytes[8] = (bytes[8] & 63) | 128;

    const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0"));

    return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-${hex.slice(6, 8).join("")}-${hex.slice(8, 10).join("")}-${hex.slice(10, 16).join("")}`;
  };

  Object.defineProperty(window.crypto, "randomUUID", {
    configurable: true,
    value: randomUUID,
  });
}

function createVisitorId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `syntraflow-${crypto.randomUUID()}`;
  }

  return `syntraflow-${Date.now()}`;
}

function buildStartPrompts(locale: Locale) {
  return locale === "ro"
    ? [
        {
          label: "Oferta AI",
          prompt: "Vreau detalii despre pachetul AI Assistant si urmatorii pasi.",
        },
        {
          label: "Demo",
          prompt: "Ajuta-ma sa programez un demo pentru website si AI assistant.",
        },
        {
          label: "Preturi",
          prompt: "Explica-mi pe scurt diferentele dintre AI, Website Builder si Hosting.",
        },
      ]
    : [
        {
          label: "AI offer",
          prompt: "I want details about the AI Assistant offer and the next steps.",
        },
        {
          label: "Demo",
          prompt: "Help me schedule a demo for the website and AI assistant.",
        },
        {
          label: "Pricing",
          prompt: "Briefly explain the differences between AI, Website Builder, and Hosting.",
        },
      ];
}

function ChatKitSkeleton({ mode }: { mode: "page" | "widget" }) {
  const isWidget = mode === "widget";

  return (
    <div className={cn(isWidget ? "flex h-full min-h-0 flex-col" : "panel-surface rounded-[2rem] p-4 md:p-6")}>
      <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-[1.5rem] border border-black/8 bg-[#fafaf7]">
        <div className="border-b border-[#0d3358]/8 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 animate-pulse rounded-2xl border border-black/8 bg-white" />
            <div className="space-y-2">
              <div className="h-3 w-32 animate-pulse rounded-full bg-[#dce7f2]" />
              <div className="h-2.5 w-24 animate-pulse rounded-full bg-[#e6eef6]" />
            </div>
          </div>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-4 px-4 py-4 md:px-5">
          <div className="h-18 w-[78%] animate-pulse rounded-[1.35rem] border border-black/6 bg-white" />
          <div className="ml-auto h-14 w-[62%] animate-pulse rounded-[1.35rem] border border-[#d8ebe4] bg-[#eefaf4]" />
          <div className="h-20 w-[74%] animate-pulse rounded-[1.35rem] border border-black/6 bg-white" />
          <div className="mt-auto rounded-[1.35rem] border border-black/10 bg-white p-3">
            <div className="h-10 animate-pulse rounded-2xl bg-[#f3f6f9]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatKitUnavailable({
  mode,
  locale,
}: {
  mode: "page" | "widget";
  locale: Locale;
}) {
  const isWidget = mode === "widget";
  const isRomanian = locale === "ro";

  return (
    <div className={cn(isWidget ? "flex h-full min-h-0 flex-col" : "panel-surface rounded-[2rem] p-4 md:p-6")}>
      <div className="flex h-full min-h-0 items-center justify-center rounded-[1.5rem] border border-black/8 bg-[#fafaf7] px-6 py-8 text-center">
        <div className="max-w-sm">
          <p className="text-sm font-semibold text-[#0b1f35]">
            {isRomanian ? "ChatKit nu este configurat complet" : "ChatKit is not fully configured"}
          </p>
          <p className="mt-3 text-sm leading-7 text-[#5c7085]">
            {isRomanian
              ? "Adauga OPENAI_API_KEY si OPENAI_CHATKIT_WORKFLOW_ID in .env.local pentru a porni widgetul conectat la OpenAI Agent Builder."
              : "Add OPENAI_API_KEY and OPENAI_CHATKIT_WORKFLOW_ID to .env.local to start the widget connected to OpenAI Agent Builder."}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ChatKitPanel({
  enabled,
  mode = "page",
  locale = "ro",
  workflowId = "",
}: ChatKitPanelProps) {
  const { pushToast } = useToast();
  const isWidget = mode === "widget";
  const isRomanian = locale === "ro";
  const workflowStorageKey = workflowId || "default";
  const [storedVisitorId, setStoredVisitorId, isVisitorHydrated] = useLocalStorage<unknown>(
    "syntraflow-chatkit-user",
    "",
  );
  const [storedThreadId, setStoredThreadId, isThreadHydrated] = useLocalStorage<unknown>(
    `syntraflow-chatkit-thread-${workflowStorageKey}-${locale}-${mode}`,
    null,
  );
  const [scriptStatus, setScriptStatus] = useState<ChatKitScriptStatus>("loading");
  const [scriptAttempt, setScriptAttempt] = useState(0);
  const [chatKitInstanceKey, setChatKitInstanceKey] = useState(0);

  const visitorId = typeof storedVisitorId === "string" ? storedVisitorId.trim() : "";
  const threadId =
    typeof storedThreadId === "string" && storedThreadId.trim().length > 0
      ? storedThreadId.trim()
      : null;

  useEffect(() => {
    if (!enabled) {
      return;
    }

    ensureRandomUuid();

    if (window.customElements.get(CHATKIT_ELEMENT_NAME)) {
      setScriptStatus("ready");
      return;
    }

    setScriptStatus("loading");

    document
      .querySelectorAll<HTMLScriptElement>(`script[data-syntraflow-chatkit-script="true"]`)
      .forEach((script) => script.remove());

    const script = document.createElement("script");
    script.src = scriptAttempt > 0 ? `${CHATKIT_SCRIPT_URL}&retry=${scriptAttempt}` : CHATKIT_SCRIPT_URL;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.dataset.syntraflowChatkitScript = "true";

    let isActive = true;
    const markAsFailed = () => {
      if (isActive) {
        setScriptStatus("error");
      }
    };
    const timeoutId = window.setTimeout(markAsFailed, 15_000);

    script.addEventListener("error", markAsFailed, { once: true });
    document.head.appendChild(script);

    window.customElements.whenDefined(CHATKIT_ELEMENT_NAME).then(() => {
      if (!isActive) {
        return;
      }

      window.clearTimeout(timeoutId);
      setScriptStatus("ready");
    });

    return () => {
      isActive = false;
      window.clearTimeout(timeoutId);
      script.removeEventListener("error", markAsFailed);
    };
  }, [enabled, scriptAttempt]);

  useEffect(() => {
    if (!isVisitorHydrated) {
      return;
    }

    if (!visitorId) {
      setStoredVisitorId(createVisitorId());
    } else if (storedVisitorId !== visitorId) {
      setStoredVisitorId(visitorId);
    }
  }, [isVisitorHydrated, setStoredVisitorId, storedVisitorId, visitorId]);

  useEffect(() => {
    if (isThreadHydrated && storedThreadId !== null && !threadId) {
      setStoredThreadId(null);
    }
  }, [isThreadHydrated, setStoredThreadId, storedThreadId, threadId]);

  const isReady =
    isVisitorHydrated &&
    isThreadHydrated &&
    visitorId.length > 0 &&
    scriptStatus === "ready";
  const { control } = useChatKit({
    api: {
      async getClientSecret() {
        const response = await fetch("/api/chatkit/session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: visitorId, workflowId }),
        });

        const payload = (await response.json().catch(() => ({}))) as {
          client_secret?: string;
          error?: string;
        };

        if (!response.ok || !payload.client_secret) {
          throw new Error(
            payload.error ||
              (isRomanian
                ? "Sesiunea ChatKit nu a putut fi pornita."
                : "The ChatKit session could not be started."),
          );
        }

        return payload.client_secret;
      },
    },
    locale,
    initialThread: threadId,
    frameTitle: "SyntraFlow AI Assistant",
    theme: {
      colorScheme: "light",
      radius: "round",
      density: "compact",
      color: {
        accent: {
          primary: "#0f79ff",
          level: 2,
        },
      },
      typography: {
        fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif",
      },
    },
    header: {
      title: {
        enabled: false,
      },
    },
    history: {
      enabled: true,
      showDelete: true,
      showRename: true,
    },
    composer: {
      placeholder: isRomanian ? "Scrie un mesaj..." : "Write a message...",
    },
    startScreen: {
      greeting: isRomanian ? "Cu ce te pot ajuta astazi?" : "How can I help today?",
      prompts: buildStartPrompts(locale),
    },
    onThreadChange(event) {
      setStoredThreadId(event.threadId);
    },
    onError(event) {
      const errorText = `${event.error.name} ${event.error.message}`;
      const failedToLoadStoredThread =
        Boolean(threadId) && /initial thread|load conversation|load initial/i.test(errorText);

      if (failedToLoadStoredThread) {
        setStoredThreadId(null);
        setChatKitInstanceKey((current) => current + 1);
        pushToast({
          tone: "info",
          title: isRomanian ? "Conversatie noua" : "New conversation",
          description: isRomanian
            ? "Conversatia veche nu mai era disponibila. Am pornit automat una noua."
            : "The previous conversation was no longer available. A new one was started automatically.",
        });
        return;
      }

      pushToast({
        tone: "error",
        title: isRomanian ? "ChatKit indisponibil" : "ChatKit unavailable",
        description: event.error.message,
      });
    },
  });

  if (!enabled) {
    return <ChatKitUnavailable mode={mode} locale={locale} />;
  }

  if (scriptStatus === "error") {
    return (
      <BasicAssistantChat
        mode={mode}
        locale={locale}
        onRetryChatKit={() => setScriptAttempt((current) => current + 1)}
      />
    );
  }

  if (!isReady) {
    return <ChatKitSkeleton mode={mode} />;
  }

  const shellClassName = isWidget
    ? "flex h-full min-h-0 flex-col rounded-[1.5rem] bg-[#fafaf7]"
    : "panel-surface reveal-section rounded-[2rem] p-4 md:p-6";

  return (
    <div className={shellClassName}>
      <div className="mb-3 flex items-center gap-2 rounded-[1.1rem] border border-black/6 bg-white/92 px-3.5 py-2.5 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
        <LogoMark className="h-6 w-6 shrink-0" />
        <span className="whitespace-nowrap text-sm font-semibold text-[#0b1f35]">
          SyntraFlow AI Assistant
        </span>
      </div>
      <div
        className={cn(
          "flex min-h-0 flex-1 overflow-hidden rounded-[1.5rem] border border-black/8 bg-[#fafaf7]",
          !isWidget && "h-[40rem]",
        )}
      >
        <ChatKit key={chatKitInstanceKey} control={control} className="h-full w-full" />
      </div>
    </div>
  );
}
