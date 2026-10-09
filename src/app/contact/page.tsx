import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Contact | Tatiana Botero",
  description: "Get in touch with Tatiana Botero.",
};
/* Contact destinations. */
/* Placeholders carried over from the original footer. Replace with the real profile and address. */
const LINKEDIN_URL = "https://www.linkedin.com/in/tatiana-botero-os/";
const EMAIL_ADDRESS = "laura.botero.pro@gmail.com";

export default function ContactPage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main" className="contact-main">
        <div className="page-shell contact-inner">
          <div>
            <p className="eyebrow">Contact</p>
            <h1>Let’s talk about product,<br />operations, and outcomes.</h1>
          </div>
          <div className="contact-actions">
            <a className="contact-link" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
            <a className="contact-link" href={`mailto:${EMAIL_ADDRESS}`}>Email <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </main>
      <SiteFooter hideContact />
    </>
  );
}
