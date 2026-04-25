"use client";

import Link from "next/link";
import { Activity, ChevronLeft } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { usePathname, useRouter } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between px-10 py-6 mx-auto w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-green-900 ">
      <div className="flex items-center gap-4">
        {pathname !== "/" && (
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-sm text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
        <Link href="/" className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-black dark:text-white" />
          <span className="text-xl tracking-tighter font-mono">HolisticAI</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle />
      </div>
    </nav>
  );
}