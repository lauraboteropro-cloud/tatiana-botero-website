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

function LinkedInLogo() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" focusable="false">
      <rect width="24" height="24" rx="4" fill="#0A66C2" />
      <path fill="#fff" d="M6.1 9.4h2.6V18H6.1V9.4zm1.3-4.1a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10.4 9.4h2.5v1.2c.4-.7 1.3-1.4 2.6-1.4 2.7 0 3.2 1.8 3.2 4.1V18h-2.6v-4.2c0-1 0-2.300-1.400-2.300s-1.700 1.100-1.700 2.200V18h-2.600V9.400z" />
    </svg>
  );
}

function GmailLogo() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" focusable="false">
      <path fill="#EA4335" d="M2 6.5v11A1.500 1.500 0 003.500 19H6V9.800L12 14.300 18 9.800V19h2.500a1.500 1.500 0 001.500-1.500v-11c0-1.900-2.200-2.900-3.700-1.700L12 9.700 5.700 4.800C4.200 3.600 2 4.600 2 6.500z" />
      <path fill="#4285F4" d="M18 9.800V19h2.500a1.500 1.500 0 001.500-1.500V7.200z" />
      <path fill="#34A853" d="M6 9.800V19H3.500A1.500 1.500 0 012 17.500V7.200z" />
      <path fill="#FBBC04" d="M18 5.200v4.600l4-2.900v-.400c0-1.900-2.200-2.900-3.700-1.700z" />
    </svg>
  );
}

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
            <a className="contact-link" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"><span className="contact-label"><span className="contact-icon" aria-hidden="true"><LinkedInLogo /></span>LinkedIn</span> <span aria-hidden="true">↗</span></a>
            <a className="contact-link" href={`mailto:${EMAIL_ADDRESS}`}><span className="contact-label"><span className="contact-icon" aria-hidden="true"><GmailLogo /></span>Email</span> <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </main>
      <SiteFooter hideContact />
    </>
  );
}
