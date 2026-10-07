export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-inner page-shell">
        <div>
          <p className="footer-kicker">Contact</p>
          <h2>Let’s talk about product,<br />operations, and outcomes.</h2>
        </div>
        <div className="footer-links" aria-label="Contact links">
          <a href="https://www.linkedin.com/" aria-label="LinkedIn profile placeholder">LinkedIn ↗</a>
          <a href="mailto:your-email@example.com">Email ↗</a>
        </div>
      </div>
      <div className="footer-bottom page-shell">
        <p>Tatiana Botero</p>
        <p>Product, with the whole system in view.</p>
      </div>
    </footer>
  );
}