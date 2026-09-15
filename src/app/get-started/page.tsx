"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useClerk } from "@clerk/nextjs";
import { Activity, Cpu, Wind, Lamp, ArrowRight} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

const DOMAINS = [
  {
    id: "physical",
    bay: "A1",
    label: "Physical",
    icon: Activity,
    load: "bodyStrain · recoveryCapacity",
    signals: ["postureLoad", "hydrationDeficit", "circulationRisk"],
    blurb: "Posture, hydration, and circulation under sustained hours.",
  },
  {
    id: "mental",
    bay: "A2",
    label: "Mental",
    icon: Cpu,
    load: "sustainedAttention · decisionFatigue",
    signals: ["focusCapacity", "cognitiveLoad", "contextSwitchRate"],
    blurb: "Focus capacity, cognitive load, and context switching.",
  },
  {
    id: "emotional",
    bay: "A3",
    label: "Emotional",
    icon: Wind,
    load: "emotionalStability · escalationRisk",
    signals: ["stressIndex", "frustrationLevel", "recoveryDebt"],
    blurb: "Stress, friction, and recovery debt accumulation.",
  },
  {
    id: "environmental",
    bay: "A4",
    label: "Environmental",
    icon: Lamp,
    load: "sensoryLoad · focusSupport",
    signals: ["noiseDistractionIndex", "lightingStrain", "workspaceErgonomics"],
    blurb: "Noise, lighting, and workstation ergonomics.",
  },
] as const;

export default function GetStartedPage() {
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const { signOut } = useClerk();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowSignOutModal(false);
    };
    if (showSignOutModal) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSignOutModal]);

  const handleSignOut = async () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
    }
    await signOut({ redirectUrl: "/" });
  };

  return (
    <div className="min-h-dvh bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <header className="sticky top-0 py-6 z-40 border-b border-zinc-200/80 bg-zinc-100/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
        <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-4 sm:px-8">
          <Link href="" className="flex items-center gap-2 font-mono text-sm">
            <span className="flex size-7 items-center justify-center rounded-md border border-zinc-300 text-[11px] dark:border-zinc-700">
              DP
            </span>
            DevPulse
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSignOutModal(true)}
              className="hidden min-h-10 items-center px-3 font-mono text-[11px] uppercase tracking-[0.2em] hover:text-black hover:dark:text-purple-500 text-zinc-500 sm:inline-flex"
            >
              Sign out
            </button>

            <button
              type="button"
              onClick={() => setShowSignOutModal(true)}
              className="inline-flex size-10 items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 sm:hidden"
              aria-label="Sign out"
            >
            </button>

            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-4 py-12 sm:px-8 sm:py-16">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-orange-500">
            Session · Initialize
          </p>
          <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
            Choose the domain under load.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
            Telemetry is scored first. Retrieval only fires what crossed a
            threshold. The model narrates those results — nothing else. Pick the
            bay that matches your current pressure.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {DOMAINS.map((d) => {
            const Icon = d.icon;
            return (
              <Link
                key={d.id}
                href={`/demo/${d.id}`}
                className="group flex flex-col rounded-[24px] border border-zinc-200 bg-white p-6 transition hover:border-orange-500/60 dark:border-zinc-800 dark:bg-zinc-900 sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-700">
                      <Icon className="size-4 text-zinc-500 transition group-hover:text-orange-500" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                        Bay {d.bay}
                      </p>
                      <h2 className="text-xl font-medium tracking-tight">
                        {d.label}
                      </h2>
                    </div>
                  </div>
                  <ArrowRight className="size-4 shrink-0 text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-orange-500 dark:text-zinc-600" />
                </div>

                <p className="mt-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {d.blurb}
                </p>

                <div className="mt-6 space-y-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                    Derived · {d.load}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {d.signals.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-zinc-200 px-2 py-1 font-mono text-[10px] text-zinc-500 dark:border-zinc-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 border-t border-zinc-200 pt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 dark:border-zinc-800">
          Select a domain to load telemetry and begin.
        </div>
      </main>

      {showSignOutModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setShowSignOutModal(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-md rounded-[24px] border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-orange-500">
              Session
            </p>
            <h2 className="mt-2 text-xl font-medium tracking-tight">
              Sign out of DevPulse?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              This ends the current session and clears local telemetry state on
              this device.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowSignOutModal(false)}
                className="h-10 rounded-full border border-zinc-300 px-4 font-mono text-[11px] uppercase tracking-[0.18em] dark:border-zinc-700 hover:bg-green-500 hover:text-white "
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSignOut}
                className="h-10 rounded-full bg-zinc-900 px-5 font-mono text-[11px] uppercase tracking-[0.18em] text-white dark:bg-zinc-50 hover:bg-purple-500 hover:dark:bg-purple-500 hover:dark:text-white dark:text-zinc-900"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
