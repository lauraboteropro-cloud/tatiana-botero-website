"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

const projects = [
  { label: "Enterprise Platform", href: "/work/enterprise-workforce-platform" },
  { label: "MOM Seguros", href: "/work/mom-seguros" },
  { label: "Stealth Telecom", href: "/work/stealth-telecom" },
  { label: "Tempo", href: "/work/tempo-ai-life-planner" },
];

/* The only site navigation on a full case-study page: one quiet button that opens a short menu.
   Work expands in place so another project is one tap away. */
export function CaseMenu() {
  const [open, setOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(true);
  const pathname = usePathname();
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

  const close = () => setOpen(false);

  return (
    <header className="case-top">
      <div className="case-menu" ref={root}>
        <button ref={button} type="button" className="case-menu-button" aria-expanded={open} aria-controls={`${uid}-menu`} aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>
          <span aria-hidden="true" className="case-menu-icon"><i /><i /><i /></span>
        </button>
        <nav id={`${uid}-menu`} className="case-menu-panel glass" aria-label="Main navigation" hidden={!open}>
          <Link href="/" onClick={close}>Tatiana Botero<small>Home</small></Link>

          <button type="button" className="case-menu-work" aria-expanded={workOpen} aria-controls={`${uid}-work`} onClick={() => setWorkOpen((value) => !value)}>
            Work<span aria-hidden="true" className="case-menu-chevron" />
          </button>
          <div id={`${uid}-work`} className="case-menu-sub" hidden={!workOpen}>
            {projects.map((project) => (
              <Link key={project.href} href={project.href} onClick={close} aria-current={pathname === project.href ? "page" : undefined}>{project.label}</Link>
            ))}
            <Link href="/#work" onClick={close} className="case-menu-all">View all work <span aria-hidden="true">→</span></Link>
          </div>

          <Link href="/about" onClick={close}>About</Link>
          <Link href="/contact" onClick={close}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}
