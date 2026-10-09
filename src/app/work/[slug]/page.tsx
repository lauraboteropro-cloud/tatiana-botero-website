import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { EnterpriseCase } from "@/components/enterprise-case";
import { MomCase } from "@/components/mom-case";
import { TempoCase } from "@/components/tempo-case";
import { TelecomCase } from "@/components/telecom-case";
import { SiteHeader } from "@/components/site-header";

const studies = {
  "enterprise-workforce-platform": {
    title: "From fragmented operations to one connected employee lifecycle.",
    subtitle: "Enterprise Workforce Platform · Product Management · Operations Transformation",
    description: "A multi-year product journey connecting employee lifecycle workflows across HR, Payroll, Recruitment, Training, Operations, Finance, Quality, and IT.",
  },
  "stealth-telecom": {
    title: "Finding the problems worth turning into products.",
    subtitle: "Stealth Telecom Technology · Product & Go-to-Market Lead · 2026–Present",
    description: "Market-led 0→1 product strategy and customer discovery across telecom operational problems.",
  },
  "mom-seguros": {
    title: "Building the product. Questioning the business.",
    subtitle: "MOM Seguros · Co-Founder / Product · Insurtech",
    description: "An external insurance product spanning self-service journeys, partner integrations, and founder-level product decisions.",
  },
  "tempo-ai-life-planner": {
    title: "What if available time isn’t the same as available capacity?",
    subtitle: "Tempo · AI Product Exploration · 2026 Side Project",
    description: "A 2026 side project exploring AI planning and the difference between available time and available capacity.",
  },
} as const;

type StudySlug = keyof typeof studies;

export function generateStaticParams() {
  return Object.keys(studies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = studies[slug as StudySlug];
  return study ? { title: `${study.title} | Tatiana Botero`, description: study.description } : {};
}

const cases = {
  "enterprise-workforce-platform": EnterpriseCase,
  "stealth-telecom": TelecomCase,
  "mom-seguros": MomCase,
  "tempo-ai-life-planner": TempoCase,
} as const;

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  if (!(slug in cases)) notFound();
  const Case = cases[slug as StudySlug];
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <Case />
      <SiteFooter />
    </>
  );
}
