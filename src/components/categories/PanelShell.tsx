"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface PanelShellProps {
  title: string;
  icon?: LucideIcon;
  children: ReactNode;
}

export function PanelShell({ title, icon: Icon, children }: PanelShellProps) {
  return (
    <div className="space-y-6">
      {/* HEADER CARD */}
      <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-zinc-400">
            {title}
          </span>
          {Icon && <Icon className="h-3 w-3 text-emerald-500 animate-pulse" />}
        </div>
        

        <div className="space-y-3">{children}</div>
      </div>
    </div>
  );
}
