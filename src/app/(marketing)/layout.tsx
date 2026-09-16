// src/app/(marketing)/layout.tsx
import Link from "next/link";
import { Show, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";

function MarketingFooter() {
  return (
    <footer className="w-full border-t border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-6 px-4 py-10 font-mono sm:flex-row sm:px-8">
        <Link href="/" className="flex items-center gap-2 font-mono text-sm">
          <span className="flex size-7 items-center justify-center rounded-md border border-zinc-300 text-[11px] dark:border-zinc-700">
            DP
          </span>
          DevPulse
        </Link>
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
        </div>
        <span className="text-[10px] text-zinc-400">© 2026</span>
      </div>
    </footer>
  );
}

function MarketingHeader() {
  return (
    <header className="sticky top-0 py-6  z-40 border-b border-zinc-200/80 bg-zinc-100/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2 font-mono text-sm">
          <span className="flex size-7 items-center justify-center rounded-md border border-zinc-300 text-[11px] dark:border-zinc-700">
            DP
          </span>
          DevPulse
        </Link>

        <div className="flex items-center gap-2">
          <Show when="signed-out">
            <Link
              href="/sign-in"
              className="hidden h-10 items-center px-3 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 hover:text-black dark:hover:text-white sm:inline-flex"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex h-10 items-center rounded-full bg-zinc-900 px-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white hover:bg-green-500 dark:bg-white dark:text-zinc-900  dark:hover:bg-purple-500 dark:hover:text-white "
            >
              Try free
            </Link>
          </Show>

          <Show when="signed-in">
            <Link
              href="/get-started"
              className="inline-flex h-10 items-center rounded-full bg-zinc-900 px-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white dark:bg-zinc-50 dark:text-zinc-900"
            >
              Open session
            </Link>
            <UserButton />
          </Show>

          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <MarketingHeader />
      <div className="flex-1">{children}</div>
      <MarketingFooter />
    </div>
  );
}
