/**
 * @file content.ts
 * @description Single source of truth for all data structures and content schemas across the BSTC website.
 * Follows PRD §7 specifications. Every content module in `src/data/` implements these interfaces.
 */

// ============================================================================
// 1. SERVICE DATA INTERFACES
// ============================================================================

/**
 * FAQ item specific to a service.
 */
export interface ServiceFaq {
  /** The question string displayed on the accordion button. */
  q: string;
  /** The answer string or markdown-safe text displayed when the accordion expands. */
  a: string;
}

/**
 * Service Definition Interface.
 * Defines a tax, corporate, or financial advisory service offered by BSTC.
 * Renders on:
 * - Homepage services grid (card preview via `title`, `icon`, `desc`, `slug`)
 * - Dynamic service detail page at `/services/[slug]`
 * - Navigation dropdown menus and footer links
 */
export interface Service {
  /**
   * Unique URL-friendly slug (e.g. "income-tax-filing", "secp-company-registration").
   * Maps directly to route `/services/[slug]`.
   */
  slug: string;

  /**
   * Display name of the service (e.g. "Income Tax Return Filing").
   * Appears as the main H1 on the service detail page and H3 on cards.
   */
  title: string;

  /**
   * Name of the Lucide icon from `src/components/ui/Icon.tsx` (e.g. "Calculator", "Building2", "FileText").
   */
  icon: string;

  /**
   * Short teaser summary (1–2 sentences).
   * Appears on the homepage services section cards and quick search.
   */
  desc: string;

  /**
   * Comprehensive service overview and legal/regulatory context.
   * Appears as the primary narrative on `/services/[slug]`.
   */
  fullDesc: string;

  /**
   * Bullet points highlighting the tangible business benefits of choosing BSTC for this service.
   * Renders as a checklist in the "Key Benefits" card.
   */
  benefits: string[];

  /**
   * List of mandatory documents, certificates, and information the client must prepare.
   * Renders in the "Required Documents" compliance section.
   */
  reqDocs: string[];

  /**
   * Step-by-step procedural workflow from initial consultation to filing/certificate issuance.
   * Renders as a numbered step timeline on the service detail page.
   */
  process: string[];

  /**
   * Frequently asked questions specifically addressing this service.
   * Renders inside the service page's FAQ Accordion component.
   */
  faqs: ServiceFaq[];

  /**
   * SEO <title> tag specifically tailored for this service page.
   */
  seoTitle: string;

  /**
   * SEO meta <description> summarizing the service for search engine snippets.
   */
  seoDesc: string;

  /**
   * Publication status.
   * - "active": Publicly accessible and listed on homepage.
   * - "inactive": Hidden from listings and sitemap (draft mode).
   */
  status: "active" | "inactive";

  /**
   * Numeric sort order for sorting services across cards and navigation menus (ascending).
   */
  order: number;

  /**
   * Service category classification (e.g. "tax-corporate", "us-corporate", or "it-digital").
   */
  category?: "tax-corporate" | "us-corporate" | "it-digital" | string;

  /**
   * Optional custom banner image path (e.g. "/images/services/income-tax.jpg").
   */
  banner?: string;
}

// ============================================================================
// 2. TEAM MEMBER INTERFACES
// ============================================================================

/**
 * Team Member / Consultant Profile Interface.
 * Defines a tax practitioner, corporate advisor, or leadership member at BSTC.
 * Renders on:
 * - Homepage team showcase section
 * - Dynamic consultant profile page at `/team/[slug]`
 */
export interface TeamMember {
  /**
   * Unique URL-friendly slug (e.g. "hassan-zeb", "sarah-khan").
   * Maps directly to route `/team/[slug]`.
   */
  slug: string;

  /**
   * Full legal or professional name of the team member (e.g. "Hassan Zeb").
   */
  name: string;

  /**
   * Professional designation and certifications (e.g. "Principal Tax Consultant & Registered ITP").
   */
  desig: string;

  /**
   * Practice department (e.g. "Direct Taxation", "Corporate & SECP Advisory", "Audit & Bookkeeping").
   */
  dept: string;

  /**
   * Short bio snippet (1 sentence) for grid cards.
   */
  shortDesc: string;

  /**
   * Full biographical narrative, background, qualifications, and advisory experience.
   * Appears on the consultant's `/team/[slug]` detail page.
   */
  bio: string;

  /**
   * Direct professional email address.
   */
  email: string;

  /**
   * Direct office phone number or mobile.
   */
  phone: string;

  /**
   * Optional office phone extension number.
   */
  ext?: string;

  /**
   * Direct WhatsApp number in international format (e.g. "923001234567").
   * Used for 1-click consultation links.
   */
  wa?: string;

  /**
   * LinkedIn public profile URL.
   */
  li?: string;

  /**
   * Path to the consultant's portrait photo (e.g. "/images/team/hassan-zeb.jpg").
   */
  img: string;

  /**
   * Optional custom list of key practice areas / advisory competencies.
   */
  practiceAreas?: string[];

  /**
   * Optional concluding commitment or client promise statement.
   */
  commitment?: string;

  /**
   * Active status. Only "active" members are rendered on the live site.
   */
  status: "active" | "inactive";

  /**
   * Numeric sort order for ordering team members (e.g. 1 for founder/principal).
   */
  order: number;
}

// ============================================================================
// 3. HOMEPAGE CONTENT INTERFACES
// ============================================================================

/**
 * Hero section content.
 */
export interface HeroContent {
  /** Main headline with key emphasis phrase. */
  title: string;
  /** Sub-headline detailing firm capabilities and value proposition. */
  subtitle: string;
  /** Call-to-action button label. */
  cta: string;
  /** Optional link target for hero CTA button (defaults to "#contact"). */
  ctaLink?: string;
  /** Optional secondary button label (e.g. "Explore Services"). */
  secondaryCta?: string;
  /** Optional secondary button link target. */
  secondaryCtaLink?: string;
  /** Optional decorative background pattern or style identifier. */
  bg?: string;
}

/**
 * Metric/Statistic item for the homepage Stats bar.
 */
export interface StatItem {
  /** Display label underneath the number (e.g. "Years of Excellence", "Active Filers"). */
  label: string;
  /** Numeric value animated by the CountUp component (e.g. 15, 500, 100). */
  value: number;
  /** Suffix attached to the number (e.g. "+", "%", "k"). */
  suffix?: string;
}

/**
 * Highlight card inside the About Us section.
 */
export interface AboutCard {
  /** Feature or credential title (e.g. "ITP Licensed Practitioners"). */
  title: string;
  /** Descriptive explanation. */
  desc: string;
}

/**
 * About Us section content.
 */
export interface AboutContent {
  /** Section heading. */
  title: string;
  /** Short bold introductory statement. */
  intro: string;
  /** Detailed multi-paragraph narrative explaining the firm's history and mission. */
  desc: string;
  /** Path to the about section showcase image. */
  img: string;
  /** 2–4 highlight credential cards displayed alongside the narrative. */
  cards: AboutCard[];
}

/**
 * Value proposition item for the "Why Choose Us" section.
 */
export interface WhyItem {
  /** Lucide icon name from `src/components/ui/Icon.tsx`. */
  icon: string;
  /** Headline feature (e.g. "100% Audit-Proof Filing", "Confidential & Secure"). */
  title: string;
  /** Detailed benefit explanation. */
  desc: string;
}

/**
 * General FAQ item for homepage or general inquiry.
 */
export interface FaqItem {
  /** Question prompt. */
  q: string;
  /** Answer text or explanation. */
  a: string;
}

/**
 * Client testimonial / review item.
 */
export interface TestimonialItem {
  /** Name of the client or executive (e.g. "Muhammad Usman"). */
  name: string;
  /** Company name and title (e.g. "CEO, Apex Logistics Pvt Ltd"). */
  comp: string;
  /** Rating score out of 5 (e.g. 5). */
  rating: number;
  /** Client review text. */
  text: string;
}

/**
 * Full Homepage Content Model.
 * Structured data consumed by `src/app/page.tsx` and homepage section components.
 */
export interface HomeContent {
  /** Top hero banner and headline. */
  hero: HeroContent;
  /** Animated stats counter bar. */
  stats: StatItem[];
  /** Comprehensive about narrative and credentials. */
  about: AboutContent;
  /** 6 key value proposition pillars. */
  why: WhyItem[];
  /** Homepage frequently asked questions. */
  faqs: FaqItem[];
  /** Client reviews and testimonials. */
  testimonials: TestimonialItem[];
}

// ============================================================================
// 4. GLOBAL SITE SETTINGS & METADATA INTERFACE
// ============================================================================

/**
 * Global Site Settings & Contact Configurations.
 * Defines company contact endpoints, business hours, social links, SEO defaults, and copyright.
 * Renders in:
 * - Root `<Navbar>` and `<Footer>`
 * - Floating WhatsApp / Phone contact widgets
/**
 * Branch or office location definition.
 */
export interface OfficeLocation {
  city: string;
  name: string;
  lead?: string;
  address: string;
  phone: string;
  wa?: string;
  mapsLink?: string;
}

export interface SiteSettings {
  /** Short brand name (e.g. "BSTC"). */
  siteName: string;

  /** Full legal commercial entity name (e.g. "Business Solutions Tax Consultants"). */
  companyName: string;

  /** Path to primary logo file (e.g. "/logo.svg"). */
  logo: string;

  /** Path to site favicon (e.g. "/favicon.ico"). */
  favicon: string;

  /** Official inquiries email address. */
  email: string;

  /** Official landline or office telephone number. */
  phone: string;

  /** Primary WhatsApp number for instant chat support (international format e.g. "923001234567"). */
  wa: string;

  /** Operational working hours (e.g. "Mon - Sat: 9:00 AM - 6:00 PM"). */
  hours: string;

  /** Physical office address in Pakistan. */
  address: string;

  /** Google Maps link for directions. */
  mapsLink: string;

  /** Multiple office branches across Pakistan. */
  offices?: OfficeLocation[];

  /** Global fallback SEO title tag. */
  seoTitle: string;

  /** Global fallback SEO meta description. */
  seoDesc: string;

  /** Google Analytics 4 Measurement ID (e.g. "G-XXXXXXXXXX"). */
  gaId?: string;

  /** Facebook page URL. */
  fb?: string;

  /** LinkedIn company profile URL. */
  li?: string;

  /** Twitter / X profile URL. */
  tw?: string;

  /** Instagram profile URL. */
  ig?: string;

  /** YouTube channel URL. */
  yt?: string;

  /** Summary narrative displayed in the footer branding column. */
  footerText: string;

  /** Copyright notice string (e.g. "© 2026 BSTC. All rights reserved."). */
  copyright: string;
}
