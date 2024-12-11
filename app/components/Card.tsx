import * as React from "react";
import { cn } from "../lib/utils";

interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  children?: React.ReactNode;
  title?: string | React.ReactNode;
}

export function Card({ children, title, className, ...rest }: CardProps) {
  return (
    <article className={cn("relative block px-1 pb-4", className)} {...rest}>
      <header className="flex items-end justify-between">
        <div aria-hidden="true" className="flex-shrink-0 border-l border-t border-neutral-900 py-2 px-4" />
        <h2 className="flex-shrink-0 py-0 px-4 text-xl font-bold text-[#00bb00]">{title}</h2>
        <div aria-hidden="true" className="min-w-[10%] w-full border-r border-t border-neutral-900 py-2 px-8" />
      </header>
      <section className="border-x border-b border-neutral-900 px-8 pt-4 pb-8 overflow-x-auto overflow-y-hidden scrollbar-none">
        {children}
      </section>
    </article>
  );
}
