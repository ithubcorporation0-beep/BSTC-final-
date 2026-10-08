import { services } from "./services";
import { team } from "./team";
import { homeContent } from "./home";
import { siteSettings } from "./settings";
import { Service, TeamMember } from "@/types/content";

export { services, team, homeContent, siteSettings };

/**
 * Retrieves a single service by its URL slug.
 */
export function getServiceBySlug(slug: string): Service | undefined {
  const s = slug.toLowerCase();
  return services.find((item) => {
    const isExact = item.slug.toLowerCase() === s;
    if (isExact) return true;

    // Backward-compatible and friendly slug aliases
    if (item.slug === "software-solutions" && s === "custom-software-solutions") return true;
    if (item.slug === "llc-corporation-formation" && (s === "us-llc" || s === "us-llc-formation" || s === "llc-formation")) return true;
    if (item.slug === "ein-itin-services" && (s === "ein-itin" || s === "us-ein" || s === "itin-services")) return true;
    if (item.slug === "registered-agent" && s === "registered-agent-services") return true;
    if (item.slug === "business-tax-filing" && (s === "us-tax-filing" || s === "us-business-tax")) return true;
    if (item.slug === "bookkeeping-accounting" && (s === "us-bookkeeping" || s === "us-accounting")) return true;
    if (item.slug === "sales-tax-services" && (s === "us-sales-tax" || s === "us-sales-tax-services")) return true;
    if (item.slug === "annual-compliance" && (s === "us-annual-compliance" || s === "annual-reports")) return true;
    if (item.slug === "business-bank-account" && (s === "us-bank-account" || s === "business-bank-account-assistance")) return true;
    if (item.slug === "business-consulting" && (s === "us-business-consulting" || s === "us-consulting")) return true;

    return false;
  });
}

/**
 * Retrieves a single team member by their URL slug.
 */
export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  const s = slug.toLowerCase();
  return team.find(
    (t) =>
      t.slug.toLowerCase() === s ||
      (t.slug.toLowerCase() === "javid-hussain" && s === "javed-hussain") ||
      (t.slug.toLowerCase() === "javed-hussain" && s === "javid-hussain")
  );
}

/**
 * Returns all active services sorted by their numeric display order.
 */
export function getActiveServices(): Service[] {
  return services
    .filter((s) => s.status === "active")
    .sort((a, b) => a.order - b.order);
}

/**
 * Returns all active team members sorted by their numeric display order.
 */
export function getActiveTeam(): TeamMember[] {
  return team
    .filter((t) => t.status === "active")
    .sort((a, b) => a.order - b.order);
}
