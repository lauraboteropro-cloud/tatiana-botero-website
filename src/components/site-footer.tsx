import Link from "next/link";

export function SiteFooter({ hideContact = false }: { hideContact?: boolean }) {
  return (
    <footer className="site-footer">
      <div className="footer-bottom page-shell">
        <p>Tatiana Botero</p>
        <p>Product, with the whole system in view.</p>
        {!hideContact && <Link className="footer-contact" href="/contact">Get in touch <span aria-hidden="true">→</span></Link>}
      </div>
    </footer>
  );
}
