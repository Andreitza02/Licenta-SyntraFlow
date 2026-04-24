"use client";

import { ChatKit, useChatKit } from "@openai/chatkit-react";
import { useEffect } from "react";

import { useToast } from "@/components/providers/toast-provider";
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
  const [visitorId, setVisitorId, isVisitorHydrated] = useLocalStorage<string>("syntraflow-chatkit-user", "");
  const [threadId, setThreadId, isThreadHydrated] = useLocalStorage<string | null>(
    `syntraflow-chatkit-thread-${workflowStorageKey}-${locale}-${mode}`,
    null,
  );

  useEffect(() => {
    if (isVisitorHydrated && !visitorId) {
      setVisitorId(createVisitorId());
    }
  }, [isVisitorHydrated, setVisitorId, visitorId]);

  const isReady = isVisitorHydrated && isThreadHydrated && visitorId.length > 0;
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
      setThreadId(event.threadId);
    },
    onError(event) {
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
        <ChatKit control={control} className="h-full w-full" />
      </div>
    </div>
  );
}
