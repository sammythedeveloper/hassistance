import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";

const DOMAINS = [
  {
    id: "01",
    name: "Physical",
    load: "bodyStrain · recoveryCapacity",
    signals: ["postureLoad", "hydrationDeficit", "circulationRisk"],
  },
  {
    id: "02",
    name: "Mental",
    load: "sustainedAttention · decisionFatigue",
    signals: ["focusCapacity", "cognitiveLoad", "contextSwitchRate"],
  },
  {
    id: "03",
    name: "Emotional",
    load: "emotionalStability · escalationRisk",
    signals: ["stressIndex", "frustrationLevel", "recoveryDebt"],
  },
  {
    id: "04",
    name: "Environmental",
    load: "sensoryLoad · focusSupport",
    signals: ["noiseDistractionIndex", "lightingStrain", "workspaceErgonomics"],
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-dvh bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <main className="mx-auto max-w-[1280px] px-4 py-12 sm:px-8 sm:py-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-orange-500">
          System
        </p>
        <h1 className="mt-4 max-w-[18ch] text-4xl font-medium tracking-tight sm:text-6xl">
          A scored session. Ranked protocols. A model that cannot freelance.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
          DevPulse is not a chat product. It is a three-layer engine for
          high-output engineering sessions: measure load, retrieve only what
          crossed a threshold, then narrate those results. Identity sits in
          front of the engine so a session can persist.
        </p>

        <section className="mt-16 rounded-[28px] border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 sm:p-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
            Access · Clerk
          </p>
          <h2 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
            The landing is public. The engine is not.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
            Authentication is Clerk (Hobby). Sign-up and sign-in issue a real
            session. <span className="text-zinc-900 dark:text-zinc-100">/</span>{" "}
            stays open.{" "}
            <span className="text-zinc-900 dark:text-zinc-100">
              /get-started
            </span>
            , chat, and the model route require a signed-in user. After auth you
            load telemetry — not a blank prompt. Try free is an account, then
            the scored path. Greetings never count as a protocol turn.
          </p>
          <div className="mt-8 grid gap-3 font-mono text-[11px] uppercase tracking-[0.16em] sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 px-4 py-4 dark:border-zinc-800">
              Public · landing · about
            </div>
            <div className="rounded-2xl border border-zinc-200 px-4 py-4 dark:border-zinc-800">
              Clerk · sign-in · sign-up
            </div>
            <div className="rounded-2xl border border-zinc-200 px-4 py-4 dark:border-zinc-800">
              Gated · telemetry · retrieval · narration
            </div>
          </div>
        </section>

        <section className="mt-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
            Pipeline
          </p>
          <h2 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
            Three layers. Chat is last, and it is bound.
          </h2>
          <ol className="mt-10 grid gap-4 lg:grid-cols-3">
            <li className="rounded-[24px] border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
              <p className="font-mono text-[11px] text-orange-500">01</p>
              <h3 className="mt-3 text-xl font-medium">Telemetry</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Stack and hours coded set baseline pressure. Twelve direct
                signals across four domains are clamped 0–100. Those inputs
                derive system load (strain, attention, stability, sensory load)
                and a severity band: Low, Moderate, High, Critical. This is the
                diagnosis. No model involved.
              </p>
            </li>
            <li className="rounded-[24px] border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
              <p className="font-mono text-[11px] text-orange-500">02</p>
              <h3 className="mt-3 text-xl font-medium">Retrieval</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                A versioned knowledge base of protocols. Each rule names a
                metric, a threshold, and above/below. Score is how far the
                signal crossed the line. Only positive scores survive. Sorted by
                severity. Cap: three. If nothing tripped, the slot stays
                dormant. Code, not the LLM.
              </p>
            </li>
            <li className="rounded-[24px] border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
              <p className="font-mono text-[11px] text-orange-500">03</p>
              <h3 className="mt-3 text-xl font-medium">Narration</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                The model receives the domain status plus the ranked protocol
                titles, bodies, and sources. It restates them in the user’s
                language. It is forbidden to add a fourth intervention or a
                claim that was not retrieved. If retrieval is empty, it says so.
              </p>
            </li>
          </ol>
        </section>

        <section className="mt-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
            Layer 01 · in detail
          </p>
          <h2 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
            Four domains. Twelve signals. Derived load. Then a status.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
            <code className="font-mono text-orange-600 dark:text-orange-400">
              calculateDeveloperMetrics(base, overrides)
            </code>{" "}
            is the only scoring path. Hours are normalized against a 1–12h
            window. Stack applies a fixed pressure (DevOps highest, frontend
            lowest). Direct inputs never leak into the UI as “feelings” — they
            become system load, then a labeled band with a status message.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {DOMAINS.map((d) => (
              <article
                key={d.id}
                className="rounded-[24px] border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex items-baseline justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
                  <span>Domain {d.id}</span>
                  <span className="text-orange-500">{d.name}</span>
                </div>
                <p className="mt-4 font-mono text-xs text-zinc-500">
                  Derived · {d.load}
                </p>
                <ul className="mt-4 space-y-2 font-mono text-sm">
                  {d.signals.map((s) => (
                    <li
                      key={s}
                      className="rounded-xl border border-zinc-200 px-3 py-2 dark:border-zinc-800"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 overflow-hidden rounded-[28px] border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <div className="border-b border-zinc-200 px-6 py-5 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400 dark:border-zinc-800 sm:px-10">
            Cause → effect (examples)
          </div>
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {[
              [
                "Hours coded + postureLoad + circulationRisk",
                "bodyStrain up · recoveryCapacity down",
              ],
              [
                "cognitiveLoad + contextSwitchRate + stack pressure",
                "decisionFatigue up · sustainedAttention down",
              ],
              [
                "stressIndex + frustration + recoveryDebt",
                "escalationRisk up · emotionalStability down",
              ],
              [
                "noise + lighting vs workspaceErgonomics",
                "sensoryLoad up · focusSupport down",
              ],
            ].map(([cause, effect]) => (
              <div
                key={cause}
                className="grid gap-2 px-6 py-5 sm:grid-cols-2 sm:px-10"
              >
                <p className="font-mono text-xs text-zinc-500 sm:text-sm">
                  {cause}
                </p>
                <p className="font-mono text-xs text-zinc-900 dark:text-zinc-100 sm:text-sm">
                  {effect}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
              What we refuse
            </p>
            <h2 className="mt-3 text-2xl font-medium tracking-tight">
              The model is not the catalog.
            </h2>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              <li>No open-ended “how can I help you today.”</li>
              <li>No invented protocol that failed retrieval.</li>
              <li>No dumping the full knowledge base into the prompt.</li>
              <li>No scoring in React. Metrics live in telemetry.ts.</li>
              <li>No app chrome before Clerk on gated routes.</li>
            </ul>
          </div>
          <div className="rounded-[24px] border border-zinc-900 bg-zinc-900 p-8 text-zinc-50 dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-900">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-orange-400 dark:text-orange-600">
              Contract
            </p>
            <p className="mt-4 text-lg font-medium tracking-tight">
              Status + at most three retrieved protocols in. Narration out. If
              retrieval returns []. the user hears that their signals are in
              band — not a motivational paragraph.
            </p>
            <Link
              href="/sign-up"
              className="mt-8 inline-flex h-11 items-center rounded-full bg-zinc-50 px-6 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-900 dark:bg-zinc-900  hover:bg-purple-500 hover:dark:bg-green-500 dark:text-zinc-50"
            >
              Try free
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
