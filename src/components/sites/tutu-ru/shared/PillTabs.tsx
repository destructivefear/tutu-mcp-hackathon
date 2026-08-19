"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function PillTabs({
  tabs,
  defaultTab,
  variant = "light",
  className,
}: {
  tabs: string[];
  defaultTab?: string;
  variant?: "light" | "dark";
  className?: string;
}) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]);

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            aria-pressed={isActive}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition-colors cursor-pointer",
              isActive
                ? "bg-tutu-primary text-white hover:bg-tutu-primary-hover"
                : variant === "dark"
                ? "bg-white/90 text-tutu-text hover:bg-white"
                : "bg-white text-tutu-text hover:bg-tutu-surface"
            )}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
