import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export default function PrivacyPage() {
  return (
    <div className="min-h-dvh bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-8 sm:py-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-orange-500">
          Legal · Privacy
        </p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
          Last revised · September 2026
        </p>
        <p className="mt-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          This policy describes what DevPulse collects, why, where it lives, and
          what control you have. It matches the current system design:
          authenticated sessions, telemetry-driven retrieval, and stored
          conversation history under your account.
        </p>

        <div className="mt-14 space-y-12 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
              01 · Who we are
            </h2>
            <p className="mt-3">
              DevPulse is a protocol engine for high-output engineering
              sessions. Identity is handled by Clerk. Application data
              (conversations and related records) is stored in our PostgreSQL
              database.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
              02 · Data we process
            </h2>
            <div className="mt-4 overflow-hidden rounded-[20px] border border-zinc-200 dark:border-zinc-800">
              <div className="grid grid-cols-[1fr_1.2fr] border-b border-zinc-200 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-400 dark:border-zinc-800">
                <div className="border-r border-zinc-200 px-4 py-3 dark:border-zinc-800">
                  Category
                </div>
                <div className="px-4 py-3">Examples</div>
              </div>
              {[
                [
                  "Account (Clerk)",
                  "User id, email, auth session metadata managed by Clerk",
                ],
                [
                  "App user record",
                  "Internal user id linked to Clerk user id, last active time, optional usage counters",
                ],
                [
                  "Telemetry inputs",
                  "Stack, hours coded, domain signal values you set during a session",
                ],
                [
                  "Conversations",
                  "Category, session correlation id, timestamps",
                ],
                [
                  "Messages",
                  "User questions and assistant narrations stored as text under your conversation",
                ],
                [
                  "Technical logs",
                  "Basic operational logs needed to run and secure the service",
                ],
              ].map(([left, right]) => (
                <div
                  key={left}
                  className="grid grid-cols-[1fr_1.2fr] border-b border-zinc-200 last:border-0 dark:border-zinc-800"
                >
                  <p className="border-r border-zinc-200 px-4 py-3 text-zinc-900 dark:border-zinc-800 dark:text-zinc-100">
                    {left}
                  </p>
                  <p className="px-4 py-3">{right}</p>
                </div>
              ))}
            </div>
            <p className="mt-4">
              We do not ask for government IDs, payment card numbers inside the
              chat, or clinical records. Avoid pasting secrets, passwords, or
              highly sensitive personal data into the message box.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
              03 · How the pipeline uses data
            </h2>
            <ul className="mt-3 space-y-3">
              <li>
                <strong className="text-zinc-900 dark:text-zinc-100">
                  Telemetry
                </strong>{" "}
                — metrics are computed in application code from your inputs.
                Severity bands and derived load values drive the session state.
              </li>
              <li>
                <strong className="text-zinc-900 dark:text-zinc-100">
                  Retrieval
                </strong>{" "}
                — only protocols whose thresholds are crossed are selected from
                a fixed knowledge base. Retrieval is deterministic code, not the
                model inventing rules.
              </li>
              <li>
                <strong className="text-zinc-900 dark:text-zinc-100">
                  Narration
                </strong>{" "}
                — the model receives domain status plus retrieved protocol text
                and your message, then returns a narration. That exchange is
                processed by our model provider to generate the reply.
              </li>
              <li>
                <strong className="text-zinc-900 dark:text-zinc-100">
                  Persistence
                </strong>{" "}
                — after a successful turn, the user message and assistant reply
                are stored in PostgreSQL under a conversation owned by your user
                record.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
              04 · Why we process data
            </h2>
            <ul className="mt-3 space-y-2">
              <li>Authenticate you and protect gated routes</li>
              <li>Run scoring, retrieval, and narration for your session</li>
              <li>Keep conversation history attached to your account</li>
              <li>Enforce usage limits and prevent abuse</li>
              <li>Improve reliability and fix failures</li>
              <li>Comply with legal obligations when required</li>
            </ul>
          </section>

          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
              05 · Storage and security
            </h2>
            <p className="mt-3">
              Application data is stored in PostgreSQL (hosted database).
              Connections use TLS. Access to conversation data is scoped to the
              authenticated user on the server: API routes and server actions
              require a valid Clerk session before read/write.
            </p>
            <p className="mt-3">
              No system is perfect. We apply reasonable technical and
              organizational measures, but we cannot guarantee absolute
              security.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
              06 · Processors and subprocessors
            </h2>
            <ul className="mt-3 space-y-2">
              <li>
                <strong className="text-zinc-900 dark:text-zinc-100">
                  Clerk
                </strong>{" "}
                — authentication and account identity
              </li>
              <li>
                <strong className="text-zinc-900 dark:text-zinc-100">
                  Database host (e.g. Aiven Postgres)
                </strong>{" "}
                — storage of users, conversations, messages
              </li>
              <li>
                <strong className="text-zinc-900 dark:text-zinc-100">
                  Model provider (Google Gemini)
                </strong>{" "}
                — generates narration from retrieved protocols and your message
              </li>
              <li>
                <strong className="text-zinc-900 dark:text-zinc-100">
                  Hosting / infrastructure
                </strong>{" "}
                — serves the application
              </li>
            </ul>
            <p className="mt-3">
              We do not sell your personal data. We do not use conversation
              content for third-party advertising.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
              07 · Retention
            </h2>
            <p className="mt-3">
              Account and conversation data are kept while your account remains
              active and as needed to provide the service. You may request
              deletion of your account data; when we delete your app user
              record, related conversations and messages are removed via
              cascading deletes in our database design. Clerk account deletion
              follows Clerk’s process and may be linked via webhook in a later
              revision of the product.
            </p>
            <p className="mt-3">
              We may retain limited records when required for security, dispute
              resolution, or legal compliance.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
              08 · Your choices
            </h2>
            <ul className="mt-3 space-y-2">
              <li>
                Access or export your data by contacting us (or in-product tools
                when available)
              </li>
              <li>
                Correct inaccurate account information via Clerk account
                settings
              </li>
              <li>Request deletion of your DevPulse application data</li>
              <li>Sign out to end the local session on a device</li>
            </ul>
            <p className="mt-3">
              Depending on your location, you may have additional rights under
              laws such as GDPR or CCPA. We will respond to valid requests
              within the timeframes those laws require.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
              09 · Children
            </h2>
            <p className="mt-3">
              DevPulse is directed at adults in professional software contexts.
              It is not intended for children under 16 (or the minimum age
              required in your jurisdiction).
            </p>
          </section>

          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
              10 · Changes
            </h2>
            <p className="mt-3">
              If our architecture or data practices change in a material way, we
              will update this page and revise the date above.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
              11 · Contact
            </h2>
            <p className="mt-3">
              For privacy requests, use the contact method published on the site
              or your support channel. Include enough detail for us to verify
              the account and fulfill the request.
            </p>
          </section>
        </div>

        <div className="mt-16 rounded-[24px] border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-orange-500">
            Architecture note
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Identity lives with Clerk. Scoring and retrieval run in our
            application code. Narration is generated by a model provider from
            retrieved protocols only. Conversation text is stored in Postgres
            under a user-owned conversation record — not as anonymous
            session-only logs.
          </p>
        </div>
      </main>
    </div>
  );
}
