import { SiteNav, Wordmark } from "@/components/site-nav";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="nav-pill glass">
        <Wordmark />
        <SiteNav />
      </div>
    </header>
  );
}
