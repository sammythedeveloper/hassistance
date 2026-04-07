import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-black dark:text-white font-mono p-10">
      <article className="max-w-2xl mx-auto space-y-10">
        <h1 className="text-4xl tracking-tighter text-blue-500">DATA_POLICIES</h1>
        
        <section className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest">01. Storage Logic</h2>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Data integrity is maintained via **Prisma ORM** connecting to a **PostgreSQL** instance. No Personal Identifying Information (PII)is stored at all . Any metrics logged are anonymized and used strictly for learning-session persistence.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest">02. Encryption</h2>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Database connections are secured using industry-standard TLS protocols. For this demonstration environment, robust error handling is implemented to ensure service availability without compromising communication security.
          </p>
        </section>

        <section className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800">
          <p className="text-[10px] text-zinc-400">
            NOTE: This is a demonstration. No data is ever sold, indexed for ad-tracking, or shared with third-party aggregators.
          </p>
        </section>
        
        <Link href="/" className="inline-block text-xs border-b border-black dark:border-white pb-1 opacity-50 hover:opacity-100">
          Return to root
        </Link>
      </article>
    </div>
  );
}