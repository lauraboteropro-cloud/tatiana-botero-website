"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";

const links = [
  { label: "Work", href: "/#work", match: "/work" },
  { label: "About", href: "/about", match: "/about" },
  { label: "Thinking", href: "/writing", match: "/writing" },
  { label: "Contact", href: "/contact", match: "/contact" },
];

/* My name always returns to the very top of the homepage, even when I'm already there. */
export function Wordmark() {
  const pathname = usePathname();
  const onClick = (event: MouseEvent) => {
    if (pathname !== "/") return;
    event.preventDefault();
    window.history.replaceState(null, "", "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return <Link className="wordmark" href="/" onClick={onClick}>Tatiana Botero</Link>;
}

export function SiteNav() {
  const pathname = usePathname();

  /* On the homepage, Work scrolls to Case studies. From any other page the link navigates there and lands on it. */
  const onWork = (event: MouseEvent) => {
    if (pathname !== "/") return;
    const target = document.getElementById("work");
    if (!target) return;
    event.preventDefault();
    window.history.replaceState(null, "", "/#work");
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* Page-level links: when I'm already on that page, go back to its top instead of doing nothing. */
  const onPage = (match: string) => (event: MouseEvent) => {
    if (pathname !== match) return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav aria-label="Main navigation" className="nav-links">
      {links.map((item) => {
        const active = item.match !== "" && (pathname === item.match || pathname.startsWith(`${item.match}/`));
        return (
          <Link href={item.href} key={item.label} aria-current={active ? "page" : undefined} onClick={item.label === "Work" ? onWork : onPage(item.match)}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
