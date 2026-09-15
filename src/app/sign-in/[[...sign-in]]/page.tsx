"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { SignIn } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";

  return (
    <div className="min-h-dvh bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-zinc-100/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80 py-4  ">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2 font-mono text-sm">
            <span className="flex size-7 items-center justify-center rounded-md border border-zinc-300 text-[11px] dark:border-zinc-700">
              DP
            </span>
            <span className="font-semibold">DevPulse</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/sign-up"
              className="inline-flex h-9 items-center rounded-full bg-zinc-900 px-3.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white dark:bg-zinc-50 dark:text-zinc-900 sm:h-10 sm:px-4 sm:text-[11px]"
            >
              Try free
            </Link>
            <ModeToggle />
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER: Vertical stack on mobile/tablet, side-by-side grid only on XL screens */}
      <main className="mx-auto flex min-h-[calc(100dvh-56px)] max-w-6xl flex-col items-center justify-center gap-10 px-4 py-8 sm:px-8 xl:grid xl:grid-cols-[1fr_420px] xl:gap-16 xl:py-0">
        {/* HERO TEXT */}
        <section className="flex w-full max-w-xl flex-col items-center text-center xl:items-start xl:text-left">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-orange-500">
            Signed systems only
          </p>
          <h1 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl xl:text-5xl">
            Pick up a scored session. Not a blank chat.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
            Your load is already a set of numbers. Sign in to keep the ranked
            runbook attached to you — nothing the catalog did not fire.
          </p>
          <p className="mt-6 hidden font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 xl:block">
            After this → telemetry · then the engine
          </p>
        </section>

        {/* CLERK SIGN IN CARD */}
        <section className="flex w-full max-w-md flex-col items-center justify-center">
          <SignIn
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            forceRedirectUrl="/get-started"
            fallbackRedirectUrl="/get-started"
            appearance={{
              variables: {
                borderRadius: "1.1rem",
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                colorPrimary: dark ? "#fafafa" : "#18181b",
                colorBackground: dark ? "#18181b" : "#ffffff",
              },
              elements: {
                rootBox: "w-full flex justify-center",
                card: "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 shadow-xl p-6 sm:p-8 w-full rounded-2xl",
                headerTitle:
                  "text-xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 text-center",
                headerSubtitle: "font-mono text-xs text-zinc-500 text-center",
                socialButtonsBlockButton:
                  "h-11 rounded-2xl border border-zinc-200 bg-zinc-50 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-950",
                socialButtonsBlockButtonText: "font-mono",
                dividerLine: "bg-zinc-200 dark:bg-zinc-800",
                dividerText: "font-mono text-[10px] uppercase text-zinc-400",
                formFieldLabel:
                  "font-mono text-[11px] uppercase tracking-wider",
                formFieldInput:
                  "h-11 rounded-2xl border-zinc-200 bg-zinc-50 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-950",
                formButtonPrimary:
                  "h-11 rounded-full bg-zinc-900 font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200",
                footerAction: "font-mono text-xs",
                footerActionLink:
                  "text-orange-600 hover:text-orange-500 dark:text-orange-400",
                identityPreviewEditButton:
                  "text-orange-600 dark:text-orange-400",
              },
            }}
          />

          <p className="mt-4 text-center font-mono text-[11px] text-zinc-500 xl:hidden">
            After sign-in you load telemetry. Then the engine.
          </p>
        </section>
      </main>
    </div>
  );
}
