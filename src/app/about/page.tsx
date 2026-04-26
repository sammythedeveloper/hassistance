import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-black dark:text-white font-mono p-10">
      <Link href="/" className="flex items-center gap-2 text-sm mb-12 opacity-50 hover:opacity-100 transition-opacity">
        <MoveLeft className="h-4 w-4" /> Back to Terminal
      </Link>
      
      <article className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-4xl tracking-tighter border-b border-zinc-100 dark:border-zinc-900 pb-4">
          SYSTEM_OVERVIEW
        </h1>
        <p className="text-zinc-500 leading-relaxed">
          HolisticAI is a high-performance wellness protocol designed for
          engineers who treat their bodies like their hardware. Most health
          apps are bloated with &quot;slop&quot;, unnecessary features and
          generic advice. This application refactors wellness into actionable
          scripts.
        </p>
        
        <section className="space-y-4">
          <h2 className="text-emerald-500 text-sm uppercase tracking-widest">The Tech Stack</h2>
          <ul className="grid grid-cols-2 gap-4 text-xs">
            <li className="border border-zinc-100 dark:border-zinc-900 p-3 rounded-lg">Next.js 14 (App Router)</li>
            <li className="border border-zinc-100 dark:border-zinc-900 p-3 rounded-lg">TypeScript / Tailwind CSS</li>
            <li className="border border-zinc-100 dark:border-zinc-900 p-3 rounded-lg">Prisma ORM / PostgreSQL</li>
            <li className="border border-zinc-100 dark:border-zinc-900 p-3 rounded-lg">AWS Amplify & Lambda</li>
          </ul>
        </section>

        <p className="text-xs text-zinc-400 italic">
          v0.1.0 / Optimized for Dark Mode.
        </p>
      </article>
    </div>
  );
}
