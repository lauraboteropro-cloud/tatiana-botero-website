"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

const links = [
  { label: "Tatiana Botero", note: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* The only site navigation on a full case-study page: one quiet button that opens a short menu. */
export function CaseMenu() {
  const [open, setOpen] = useState(false);
  const uid = useId();
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); button.current?.focus(); } };
    const onPointer = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onPointer); };
  }, [open]);

  return (
    <header className="case-top">
      <div className="case-menu" ref={root}>
        <button ref={button} type="button" className="case-menu-button" aria-expanded={open} aria-controls={`${uid}-menu`} aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>
          <span aria-hidden="true" className="case-menu-icon"><i /><i /><i /></span>
        </button>
        <nav id={`${uid}-menu`} className="case-menu-panel glass" aria-label="Main navigation" hidden={!open}>
          {links.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>
              {item.label}{item.note && <small>{item.note}</small>}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
