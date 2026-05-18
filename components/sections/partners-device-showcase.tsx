"use client";

import Image from "next/image";
import { useState } from "react";

type DeviceId = "android" | "apple";

const devices = [
  {
    id: "android",
    src: "/partners/galaxy-s21-dmt-ai.png",
    alt: "Galaxy S21 Ultra preview of the DMT AI assistant",
    width: 718,
    height: 1558,
  },
  {
    id: "apple",
    src: "/partners/iphone-14-pro-dmt-ai.png",
    alt: "iPhone 14 Pro Max preview of the DMT AI assistant",
    width: 878,
    height: 1790,
  },
] satisfies Array<{
  id: DeviceId;
  src: string;
  alt: string;
  width: number;
  height: number;
}>;

export function PartnersDeviceShowcase({ isRomanian }: { isRomanian: boolean }) {
  const [activeDevice, setActiveDevice] = useState<DeviceId>("android");

  return (
    <div className="reveal-section relative flex flex-col items-center gap-4">
      <div className="max-w-[24rem] text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#0b58d0]">DMT Marine Equipment</p>
        <h2 className="font-display mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#081a2b] md:text-4xl">
          Mobile AI App
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#3a5b74]">
          {isRomanian
            ? "O experienta AI mobila pentru echipele DMT: raspunsuri rapide, module operationale si suport clar direct de pe telefon."
            : "A mobile AI experience for DMT teams: fast answers, operational modules, and clear support directly from the phone."}
        </p>
      </div>

      <div
        aria-label={isRomanian ? "Alege dispozitivul" : "Choose device"}
        className="flex items-center gap-1.5 rounded-full border border-[#d8e4ee] bg-white/92 p-1 shadow-[0_14px_34px_rgba(11,31,53,0.1)]"
        role="tablist"
      >
        <button
          type="button"
          aria-label="Android Galaxy S21 Ultra"
          aria-selected={activeDevice === "android"}
          className={`grid h-10 w-11 place-items-center rounded-full border transition ${
            activeDevice === "android"
              ? "border-[#4caf50]/35 bg-white text-[#4caf50] shadow-[0_12px_22px_rgba(76,175,80,0.2)]"
              : "border-transparent bg-white text-[#3ddc84] hover:border-[#3ddc84]/30 hover:bg-[#3ddc84]/10"
          }`}
          onClick={() => setActiveDevice("android")}
          role="tab"
          title="Android"
        >
          <AndroidIcon className="h-6 w-6" />
        </button>
        <button
          type="button"
          aria-label="Apple iPhone 14 Pro Max"
          aria-selected={activeDevice === "apple"}
          className={`grid h-10 w-11 place-items-center rounded-full border transition ${
            activeDevice === "apple"
              ? "border-[#111827] bg-[#111827] shadow-[0_12px_22px_rgba(17,24,39,0.22)]"
              : "border-transparent bg-white text-[#111827] hover:border-[#111827]/20 hover:bg-[#111827]/8"
          }`}
          onClick={() => setActiveDevice("apple")}
          role="tab"
          title="Apple"
        >
          <AppleIcon className={activeDevice === "apple" ? "h-5 w-5 text-white" : "h-5 w-5"} />
        </button>
      </div>

      <div className="relative mx-auto h-[30rem] max-h-[74vh] min-h-[24rem] w-full max-w-[20rem] sm:h-[35rem] xl:h-[39rem]">
        {devices.map((device) => (
          <Image
            key={device.id}
            src={device.src}
            alt={device.alt}
            width={device.width}
            height={device.height}
            sizes="(min-width: 1280px) 320px, (min-width: 768px) 300px, 82vw"
            className={`absolute inset-0 m-auto h-full w-auto object-contain drop-shadow-[0_24px_38px_rgba(0,0,0,0.32)] transition duration-300 ${
              activeDevice === device.id ? "scale-100 opacity-100" : "scale-[0.98] opacity-0"
            }`}
            priority={device.id === "android"}
          />
        ))}
      </div>

      <p className="sr-only">{activeDevice === "android" ? "Galaxy S21 Ultra" : "iPhone 14 Pro Max"}</p>
    </div>
  );
}

function AndroidIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} fill="none" aria-hidden="true">
      <g fill="currentColor">
        <path d="M128 146.5C128 79.4 185.3 22 256 22s128 57.4 128 124.5a21.5 21.5 0 0 1-21.5 21.5h-213A21.5 21.5 0 0 1 128 146.5Z" />
        <path d="M128 193.5A23.5 23.5 0 0 1 151.5 170h209A23.5 23.5 0 0 1 384 193.5V344a64 64 0 0 1-64 64H192a64 64 0 0 1-64-64V193.5Z" />
        <rect x="42" y="171" width="65" height="212" rx="32.5" />
        <rect x="405" y="171" width="65" height="212" rx="32.5" />
        <rect x="170" y="374" width="65" height="138" rx="32.5" />
        <rect x="277" y="374" width="65" height="138" rx="32.5" />
        <rect x="151" y="-7" width="22" height="89" rx="11" transform="rotate(-45 151 -7)" />
        <rect x="345" y="56" width="22" height="89" rx="11" transform="rotate(-135 345 56)" />
      </g>
      <circle cx="203" cy="96" r="11" fill="white" />
      <circle cx="309" cy="96" r="11" fill="white" />
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.9 12.9c0-2.1 1.7-3.1 1.8-3.2-1-1.5-2.5-1.7-3.1-1.7-1.3-.1-2.5.8-3.2.8-.7 0-1.7-.8-2.8-.7-1.4 0-2.7.8-3.5 2.1-1.5 2.7-.4 6.7 1.1 8.9.7 1.1 1.6 2.3 2.7 2.2 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7c1.2 0 1.9-1.1 2.6-2.2.8-1.2 1.2-2.4 1.2-2.5 0 0-2.4-.9-2.4-3.7ZM14.8 6.7c.6-.8 1-1.8.9-2.8-.9 0-2 .6-2.6 1.3-.6.7-1.1 1.7-1 2.7 1 .1 2-.5 2.7-1.2Z" />
    </svg>
  );
}
