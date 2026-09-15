import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { AlertTriangle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-dvh bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-8 sm:py-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-orange-500">
          Legal · Terms of use
        </p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
          Terms of Use
        </h1>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
          Last revised · September 2026
        </p>
        <p className="mt-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          These Terms govern access to and use of DevPulse — a protocol engine
          for scored developer sessions. By creating an account or using the
          service, you agree to them.
        </p>

        {/* Medical disclaimer */}
        <section className="mt-10 rounded-[24px] border border-red-500/30 bg-red-500/5 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertTriangle className="size-4" />
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em]">
              Not medical care
            </h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            DevPulse is a productivity and session-load tool for software
            engineers. It is{" "}
            <strong className="text-zinc-900 dark:text-zinc-100">
              not a medical device, diagnosis service, or treatment product
            </strong>
            . Telemetry scores, retrieved protocols, and model narration are
            informational only. They do not replace advice from a licensed
            clinician. If you have a health emergency or ongoing symptoms, seek
            qualified professional care immediately.
          </p>
        </section>

        <div className="mt-14 space-y-12 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
              01 · What DevPulse is
            </h2>
            <p className="mt-3">
              DevPulse runs a three-layer pipeline for a coding session:
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <span className="text-orange-500">01</span>{" "}
                <strong className="text-zinc-900 dark:text-zinc-100">
                  Telemetry
                </strong>{" "}
                — stack, hours, and twelve signals across physical, mental,
                emotional, and environmental domains are scored in code.
              </li>
              <li>
                <span className="text-orange-500">02</span>{" "}
                <strong className="text-zinc-900 dark:text-zinc-100">
                  Retrieval
                </strong>{" "}
                — a fixed knowledge base of protocols fires only when a metric
                crosses a threshold (top three, ranked).
              </li>
              <li>
                <span className="text-orange-500">03</span>{" "}
                <strong className="text-zinc-900 dark:text-zinc-100">
                  Narration
                </strong>{" "}
                — a language model restates only retrieved protocols. It is not
                permitted to invent interventions outside that set.
              </li>
            </ul>
            <p className="mt-4">
              The product is built for developer wellbeing and session quality —
              not open-ended chat, therapy, or clinical decision support.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
              02 · Accounts and access
            </h2>
            <p className="mt-3">
              Authentication is provided by Clerk. You must keep your
              credentials secure and provide accurate account information. The
              public marketing pages (landing, about, these legal pages) are
              open. Session tooling — including domain selection, telemetry
              controls, and protocol narration — requires a signed-in user.
            </p>
            <p className="mt-3">
              We may limit free usage (for example, a fixed number of
              retrieval-backed turns). We may suspend or terminate access for
              abuse, security risk, or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
              03 · Acceptable use
            </h2>
            <ul className="mt-3 space-y-2">
              <li>
                Do not submit content that is illegal, harmful, or intended to
                bypass safety controls.
              </li>
              <li>
                Do not attempt to extract, scrape, or reverse-engineer the
                knowledge base, scoring logic, or model instructions beyond
                normal product use.
              </li>
              <li>
                Do not use DevPulse to provide clinical care to others or to
                present outputs as professional medical advice.
              </li>
              <li>
                Do not overload, probe, or disrupt the service infrastructure.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
              04 · Your inputs and outputs
            </h2>
            <p className="mt-3">
              You retain ownership of the text you submit. You grant us a
              limited license to process that text solely to operate the
              service: scoring context, retrieval, narration, and storing
              conversation history under your account.
            </p>
            <p className="mt-3">
              Model outputs are generated from your telemetry state and
              retrieved protocols. They may be incomplete or incorrect. You are
              responsible for how you act on them.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
              05 · Intellectual property
            </h2>
            <p className="mt-3">
              DevPulse branding, UI, telemetry design, knowledge-base structure,
              and software remain our property (or that of our licensors). These
              Terms do not transfer ownership of the product to you.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
              06 · Third-party services
            </h2>
            <p className="mt-3">
              The service depends on third parties, including identity (Clerk),
              database hosting, and model inference providers. Their uptime,
              policies, and failures are outside our full control. Use of those
              providers is also subject to their terms where applicable.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
              07 · Disclaimers
            </h2>
            <p className="mt-3">
              The service is provided{" "}
              <strong className="text-zinc-900 dark:text-zinc-100">
                “as is”
              </strong>
              . We do not warrant uninterrupted availability, perfect scoring
              accuracy, or that retrieved protocols will resolve your situation.
              To the maximum extent permitted by law, we disclaim implied
              warranties of merchantability, fitness for a particular purpose,
              and non-infringement.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
              08 · Limitation of liability
            </h2>
            <p className="mt-3">
              To the maximum extent permitted by law, DevPulse and its operators
              are not liable for indirect, incidental, special, consequential,
              or punitive damages, or for lost profits, data, or session
              outcomes arising from use of the service. Aggregate liability for
              claims relating to the service is limited to the greater of
              amounts you paid us in the twelve months before the claim (if any)
              or fifty U.S. dollars (US$50).
            </p>
          </section>

          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
              09 · Changes and contact
            </h2>
            <p className="mt-3">
              We may update these Terms as the product evolves. Material changes
              will be reflected on this page with a revised date. Continued use
              after changes constitutes acceptance where permitted by law.
            </p>
            <p className="mt-3">
              Questions about these Terms: use the contact channel published on
              the site or your account support path.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
