"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

export function CarouselRow({
  children,
  className,
  arrowClassName,
}: {
  children: React.ReactNode;
  className?: string;
  arrowClassName?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (delta: number) => {
    scrollerRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className={cn(
          "flex gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory",
          className
        )}
      >
        {children}
      </div>
      <button
        type="button"
        aria-label="Прокрутить вперёд"
        onClick={() => scrollBy(340)}
        className={cn(
          "hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 -right-4 h-9 w-9 rounded-full bg-white text-tutu-text shadow-md hover:shadow-lg transition-shadow cursor-pointer",
          arrowClassName
        )}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M6 3l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Прокрутить назад"
        onClick={() => scrollBy(-340)}
        className={cn(
          "hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 -left-4 h-9 w-9 rounded-full bg-white text-tutu-text shadow-md hover:shadow-lg transition-shadow cursor-pointer",
          arrowClassName
        )}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M10 3L5 8l5 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
