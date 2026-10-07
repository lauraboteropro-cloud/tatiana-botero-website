import Link from "next/link";

const navigation = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
  { label: "Writing", href: "/writing" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/#main" aria-label="Tatiana Botero, home">
        Tatiana <span>Botero</span>
      </Link>
      <nav aria-label="Main navigation" className="main-nav">
        {navigation.map((item) => (
          <Link href={item.href} key={item.label}>{item.label}</Link>
        ))}
        <Link className="nav-contact" href="/#contact">Contact</Link>
      </nav>
    </header>
  );
}