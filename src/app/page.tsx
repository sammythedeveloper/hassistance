"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Activity, Cpu, Droplets, Eye, Lamp, Wind } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

type Domain = "physical" | "mental" | "emotional" | "environmental";

const BAYS: {
  id: Domain;
  bay: string;
  label: string;
  severity: string;
  gauge: number;
  icon: typeof Activity;
  meters: { label: string; value: number }[];
  status: string;
  message: string;
  protocols: { metric: string; title: string; content: string }[];
}[] = [
  {
    id: "physical",
    bay: "A1",
    label: "Physical",
    severity: "CRITICAL ",
    gauge: 93,
    icon: Activity,
    meters: [
      { label: "Posture", value: 78 },
      { label: "Hydration", value: 68 },
      { label: "Circulation", value: 72 },
    ],
    status: "HIGH · High Physical Strain",
    message: "Back/neck load and recovery limits are approaching breakdown.",
    protocols: [
      {
        metric: "postureLoad",
        title: "Spinal Alignment Reset",
        content:
          "3-minute posture reset: neutral spine, monitor at eye level, hip-knee near 90.",
      },
      {
        metric: "hydrationDeficit",
        title: "Hydration Recovery",
        content: "300–500ml water in 15 minutes. Electrolytes if session > 3h.",
      },
      {
        metric: "circulationRisk",
        title: "Circulation Microbreak",
        content: "Every 30–45 min stand, walk 2 min, calf/hip mobility.",
      },
    ],
  },
  {
    id: "mental",
    bay: "A2",
    label: "Mental",
    severity: "High",
    gauge: 68,
    icon: Cpu,
    meters: [
      { label: "Focus", value: 38 },
      { label: "Load", value: 71 },
      { label: "Switch", value: 64 },
    ],
    status: "HIGH · High Cognitive Load",
    message: "Decision fatigue and switching are reducing quality.",
    protocols: [
      {
        metric: "focusCapacity",
        title: "Cognitive Context Reset",
        content:
          "Step away 5 minutes. Resume with one task and a stop condition.",
      },
      {
        metric: "cognitiveLoad",
        title: "Complexity Decomposition",
        content: "Break work into units. Checkpoint after each.",
      },
      {
        metric: "contextSwitchRate",
        title: "Task Switching Dampener",
        content: "45-minute single-task blocks. Mute notifications.",
      },
    ],
  },
  {
    id: "emotional",
    bay: "A3",
    label: "Emotional",
    severity: "Moderate",
    gauge: 58,
    icon: Wind,
    meters: [
      { label: "Stress", value: 58 },
      { label: "Friction", value: 52 },
      { label: "Debt", value: 66 },
    ],
    status: "MODERATE · Recoverable Emotional Fatigue",
    message: "Short decompression recommended.",
    protocols: [
      {
        metric: "recoveryDebt",
        title: "Recovery Debt Clearance",
        content: "8–12 minutes off-screen. Walk. Hydrate.",
      },
      {
        metric: "stressIndex",
        title: "Stress Decompression",
        content:
          "Two cycles of 4-7-8, then lower-pressure work for 10 minutes.",
      },
      {
        metric: "frustrationLevel",
        title: "Frustration Interrupt",
        content:
          "Write the failure point, expected behavior, one tiny experiment.",
      },
    ],
  },
  {
    id: "environmental",
    bay: "A4",
    label: "Environment",
    severity: "High",
    gauge: 64,
    icon: Lamp,
    meters: [
      { label: "Noise", value: 62 },
      { label: "Light", value: 58 },
      { label: "Ergo", value: 38 },
    ],
    status: "HIGH · Disruptive Environment",
    message: "Noise and lighting are undermining performance.",
    protocols: [
      {
        metric: "noiseDistractionIndex",
        title: "Noise Isolation",
        content: "Headphones, quieter desk, or white noise.",
      },
      {
        metric: "workspaceErgonomics",
        title: "Ergonomic Optimization",
        content: "Chair, monitor height, keyboard/mouse position.",
      },
      {
        metric: "lightingStrain",
        title: "Visual Lighting Correction",
        content: "Diffuse light, cut glare, match monitor to room.",
      },
    ],
  },
];

function Gauge({ value, active }: { value: number; active: boolean }) {
  const r = 18;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;

  return (
    <svg viewBox="0 0 48 48" className="size-12 shrink-0" aria-hidden>
      <circle
        cx="24"
        cy="24"
        r={r}
        fill="none"
        className="stroke-zinc-200 dark:stroke-zinc-700"
        strokeWidth="4"
      />
      <circle
        cx="24"
        cy="24"
        r={r}
        fill="none"
        className={active ? "stroke-orange-500" : "stroke-zinc-500"}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform="rotate(-90 24 24)"
      />
      <text
        x="24"
        y="27"
        textAnchor="middle"
        className="fill-zinc-900 dark:fill-zinc-100 font-mono"
        fontSize="9"
        fontWeight="500"
      >
        {value}
      </text>
    </svg>
  );
}

export default function LandingPage() {
  const [domain, setDomain] = useState<Domain>("physical");
  const active = useMemo(
    () => BAYS.find((b) => b.id === domain) ?? BAYS[0],
    [domain]
  );

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="sticky top-0 z-40 py-4 border-b border-zinc-200 bg-zinc-100/85 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/85">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-3 sm:px-8">
          <Link href="/" className="flex items-center gap-2 font-mono text-sm">
            <span className="flex size-7 items-center justify-center rounded-md border border-zinc-300 text-[11px] dark:border-zinc-700">
              DP
            </span>
            DevPulse
          </Link>
          <nav className="hidden items-center gap-8 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500 md:flex">
            <a href="#product">Product</a>
            <a href="#method">Method</a>
            <a href="#why">Why it exists</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/sign-in"
              className="hidden min-h-10 items-center px-3 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 hover:text-black dark:hover:text-white sm:inline-flex"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex min-h-10 items-center rounded-full bg-zinc-900 px-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white hover:bg-green-500 dark:bg-white dark:text-zinc-900  dark:hover:bg-purple-500 dark:hover:text-white   "
            >
              Try free
            </Link>
            <div className="flex items-center gap-4">
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        <section
          id="product"
          className="grid gap-10 py-12 lg:grid-cols-2 lg:items-end lg:py-16"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-orange-500">
              Protocol engine · not a chatbot
            </p>
            <h1 className="mt-5 max-w-[16ch] text-5xl font-medium leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Burnout has metrics. Treat it like a production incident.
            </h1>
          </div>
          <div className="max-w-md lg:justify-self-end">
            <p className="font-mono text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              DevPulse scores a coding session across four domains, retrieves
              only the protocols your numbers trip, then lets a model narrate
              the ranked result — never invent wellness. Sign up. Try three real
              turns free.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/sign-up"
                className="inline-flex min-h-12 items-center rounded-full bg-zinc-900 px-7 font-mono text-[11px] uppercase tracking-[0.24em] text-white dark:bg-white hover:bg-green-500 hover:text-white dark:text-zinc-900"
              >
                Try free
              </Link>
              <a
                href="#product"
                className="inline-flex min-h-12 items-center rounded-full border border-zinc-300 px-6 font-mono text-[11px] uppercase tracking-[0.24em] dark:border-zinc-700"
              >
                Inspect the system
              </a>
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
              No card · 3 protocol turns · telemetry stays on-session
            </p>
          </div>
        </section>

        <section className="overflow-hidden rounded-[32px] border  border-zinc-200 bg-zinc-50 dark:border-zinc-800  dark:bg-zinc-900">
          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.05fr_1.1fr_0.95fr]">
            <div>
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-400">
                Telemetry bays · select a domain
              </p>
              <div className="grid grid-cols-2 gap-2">
                {BAYS.map((d) => {
                  const selected = d.id === domain;
                  const Icon = d.icon;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDomain(d.id)}
                      className={`flex flex-col gap-2 rounded-[18px] border p-2.5 text-left ${
                        selected
                          ? "border-orange-500 bg-white dark:bg-zinc-800"
                          : "border-zinc-200 bg-white/80 dark:border-zinc-700 dark:bg-zinc-800/80"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Gauge value={d.gauge} active={selected} />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <Icon className="size-3 text-zinc-500" />
                            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-400">
                              {d.bay}
                            </span>
                          </div>
                          <p className="truncate text-sm font-medium">
                            {d.label}
                          </p>
                          <p className="font-mono text-[9px] uppercase text-zinc-400">
                            {d.severity}
                          </p>
                        </div>
                      </div>
                      {d.meters.map((m) => (
                        <div key={m.label}>
                          <div className="flex justify-between font-mono text-[9px] uppercase text-zinc-400">
                            <span>{m.label}</span>
                            <span>{m.value}</span>
                          </div>
                          <div className="mt-1 h-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                            <div
                              className="h-full bg-zinc-700 dark:bg-zinc-300"
                              style={{ width: `${m.value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[440px] rounded-[28px] border border-zinc-200 bg-white px-6 py-8 dark:border-zinc-700 dark:bg-zinc-800 sm:px-9 sm:py-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-orange-500 text-center">
                  Without the slop
                </p>
                <p className="mt-3 text-center text-3xl font-medium sm:text-4xl">
                  The Protocol
                  <br />
                  Computer
                </p>
                <p className="mx-auto mt-4 max-w-[34ch] text-center font-mono text-sm text-zinc-500">
                  Click a bay. Metrics fire the knowledge base. The model only
                  narrates what retrieval already ranked.
                </p>
                <div className="mt-7 rounded-[16px] bg-zinc-900 px-4 py-4 text-center dark:bg-black">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-orange-400">
                    {active.status}
                  </p>
                  <p className="mt-2 font-mono text-[11px] text-zinc-100">
                    {active.message}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-400 lg:text-right">
                Ranked protocols · {active.protocols.length} live
              </p>
              <div className="flex flex-col gap-3">
                {active.protocols.map((p, i) => (
                  <article
                    key={p.title}
                    className="rounded-[22px] border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-orange-500">
                      Slot 0{i + 1} · {p.metric}
                    </p>
                    <h3 className="mt-2 text-sm font-medium">{p.title}</h3>
                    <p className="mt-3 text-xs leading-relaxed text-zinc-500">
                      {p.content}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-zinc-200 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-400 dark:border-zinc-800">
            <span className="inline-flex items-center gap-2">
              <Droplets className="size-3 text-emerald-500" />
              Session local
            </span>
            <span className="hidden sm:inline">Guest · 3 protocol turns</span>
            <span className="inline-flex items-center gap-2">
              <Eye className="size-3" />
              No generic advice
            </span>
          </div>
        </section>

        <section
          id="method"
          className="border-t border-zinc-200 py-20 dark:border-zinc-800"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-400">
            Method
          </p>
          <h2 className="mt-3 max-w-[20ch] text-3xl font-medium sm:text-4xl">
            Three layers. Chat is the last one.
          </h2>
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              [
                "01",
                "Telemetry",
                "Stack, hours, and twelve signals across four domains. Diagnosis, not a vibe check.",
              ],
              [
                "02",
                "Retrieval",
                "Knowledge-base rules fire only when a metric crosses a threshold. Top three protocols.",
              ],
              [
                "03",
                "Narration",
                "The model explains those protocols in your words. It cannot invent a fourth.",
              ],
            ].map(([n, title, body]) => (
              <li
                key={n}
                className="rounded-[24px] border border-zinc-200 bg-white px-6 py-8 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <p className="font-mono text-[11px] text-orange-500">{n}</p>
                <h3 className="mt-4 text-xl font-medium">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                  {body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="why"
          className="border-t border-zinc-200 py-20 dark:border-zinc-800"
        >
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-400">
                Why it exists
              </p>
              <h2 className="mt-3 text-3xl font-medium sm:text-4xl">
                Generic AI will tell any engineer to drink water. That is not a
                product.
              </h2>
              <p className="mt-5 max-w-md font-mono text-sm leading-relaxed text-zinc-500">
                Lost hours after an eight-hour block: posture, switching,
                recovery debt. DevPulse is the incident runbook for that machine
                — you.
              </p>
            </div>
            <div className="overflow-hidden rounded-[24px] border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <div className="grid grid-cols-2 border-b border-zinc-200 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:border-zinc-800">
                <div className="border-r border-zinc-200 px-5 py-3 dark:border-zinc-800">
                  Wellness bot
                </div>
                <div className="px-5 py-3 text-zinc-900 dark:text-zinc-100">
                  DevPulse
                </div>
              </div>
              {[
                ["Open-ended chat", "Ranked protocols from your metrics"],
                ["Same answer for everyone", "Retrieval gated by thresholds"],
                ["Motivation copy", "Named intervention + source"],
                ["Account to say hello", "Landing first, then try free"],
              ].map(([left, right]) => (
                <div
                  key={left}
                  className="grid grid-cols-2 border-b border-zinc-200 last:border-0 dark:border-zinc-800"
                >
                  <p className="border-r border-zinc-200 px-5 py-4 text-sm text-zinc-500 dark:border-zinc-800">
                    {left}
                  </p>
                  <p className="px-5 py-4 text-sm">{right}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-[32px] bg-zinc-900 px-6 py-14 text-white dark:bg-black sm:px-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-orange-400">
            Access
          </p>
          <h2 className="mt-4 max-w-[18ch] text-3xl font-medium sm:text-4xl">
            See the landing. Sign up. Load telemetry. Then the app.
          </h2>
          <p className="mt-4 max-w-lg font-mono text-sm leading-relaxed text-zinc-400">
            Try free is an account plus three retrieval-backed turns. Greetings
            do not count.
          </p>
          <Link
            href="/sign-up"
            className="mt-8 inline-flex min-h-12 items-center rounded-full bg-white px-8 font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-900 hover:bg-green-500 hover:text-white dark:hover:bg-purple-500 "
          >
            Try free
          </Link>
        </section>
        <footer className="border-t border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-6 px-4 py-10 font-mono sm:flex-row sm:px-8">
            <div className="flex flex-wrap justify-center gap-8 text-[11px] uppercase tracking-[0.2em] text-zinc-500">
              <Link href="/about" className="hover:text-orange-500">
                About
              </Link>
              <Link href="/privacy" className="hover:text-orange-500">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-orange-500">
                Terms
              </Link>
              <a
                href="mailto:samsondev3@gmail.com"
                className="hover:text-orange-500"
              >
                Contact
              </a>
            </div>

            <span className="text-[10px] text-zinc-400">© 2026</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
