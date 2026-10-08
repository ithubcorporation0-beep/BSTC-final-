import React from "react";
import { siteSettings } from "@/data/settings";
import { Service, TeamMember } from "@/types/content";
import { getSiteUrl } from "@/lib/seo";

/**
 * Generates Schema.org AccountingService / LocalBusiness structured data.
 * Omit fields with placeholders (0000000, #, etc.) to keep Google index clean.
 */
export function getOrganizationJsonLd() {
  const siteUrl = getSiteUrl();

  const hasRealPhone = Boolean(
    siteSettings.phone && !siteSettings.phone.includes("0000000")
  );
  const hasRealAddress = Boolean(
    siteSettings.address && siteSettings.address.trim() !== ""
  );

  // Filter verified social links
  const verifiedSocials = [
    siteSettings.fb,
    siteSettings.li,
    siteSettings.tw,
    siteSettings.ig,
    siteSettings.yt,
  ].filter(
    (url): url is string =>
      Boolean(
        url &&
          url.trim() !== "" &&
          url !== "#" &&
          !url.includes("facebook.com") &&
          !url.includes("twitter.com") &&
          !url.includes("linkedin.com") &&
          !url.includes("instagram.com") &&
          !url.includes("youtube.com")
      )
  );

  const org: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": `${siteUrl}/#organization`,
    name: siteSettings.companyName,
    alternateName: siteSettings.siteName,
    url: siteUrl,
    logo: `${siteUrl}${siteSettings.logo}`,
    image: `${siteUrl}/opengraph-image`,
    description: siteSettings.seoDesc,
    priceRange: "$$",
    email: siteSettings.email,
  };

  if (hasRealPhone) {
    org.telephone = siteSettings.phone;
  }

  if (hasRealAddress) {
    org.address = {
      "@type": "PostalAddress",
      streetAddress: siteSettings.address,
      addressLocality: "Islamabad",
      addressRegion: "Islamabad Capital Territory",
      addressCountry: "PK",
    };
  }

  if (siteSettings.hours && !siteSettings.hours.includes("TODO")) {
    org.openingHours = siteSettings.hours;
  }

  if (verifiedSocials.length > 0) {
    org.sameAs = verifiedSocials;
  }

  return org;
}

/**
 * Generates Schema.org Service structured data.
 */
export function getServiceJsonLd(service: Service) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/services/${service.slug}#service`,
    name: service.title,
    description: service.desc,
    url: `${siteUrl}/services/${service.slug}`,
    provider: {
      "@type": "AccountingService",
      "@id": `${siteUrl}/#organization`,
      name: siteSettings.companyName,
      url: siteUrl,
    },
    serviceType:
      service.category === "it-digital"
        ? "IT & Digital Services"
        : service.category === "us-corporate"
        ? "US Corporate & International Business Services"
        : "Tax & Corporate Consultancy",
    areaServed:
      service.category === "us-corporate"
        ? [
            { "@type": "Country", name: "United States" },
            { "@type": "Country", name: "Pakistan" },
          ]
        : {
            "@type": "Country",
            name: "Pakistan",
          },
  };
}

/**
 * Generates Schema.org FAQPage structured data.
 * Returns null if the faqs array is empty to prevent invalid empty schema.
 */
export function getFaqPageJsonLd(faqs?: { q: string; a: string }[]) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

/**
 * Generates Schema.org BreadcrumbList structured data.
 */
export function getBreadcrumbJsonLd(
  items: { name: string; url?: string }[]
) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const itemUrl = item.url
        ? item.url.startsWith("http")
          ? item.url
          : `${siteUrl}${item.url}`
        : siteUrl;

      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: itemUrl,
      };
    }),
  };
}

/**
 * Generates Schema.org Person structured data for team members.
 */
export function getPersonJsonLd(member: TeamMember) {
  const siteUrl = getSiteUrl();

  const person: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/team/${member.slug}#person`,
    name: member.name,
    jobTitle: member.desig,
    worksFor: {
      "@type": "AccountingService",
      "@id": `${siteUrl}/#organization`,
      name: siteSettings.companyName,
    },
    description: member.shortDesc,
    url: `${siteUrl}/team/${member.slug}`,
    image: member.img ? `${siteUrl}${member.img}` : `${siteUrl}/images/team/${member.slug}.svg`,
  };

  if (member.email) {
    person.email = member.email;
  }

  if (member.li && member.li !== "#") {
    person.sameAs = [member.li];
  }

  return person;
}

/**
 * React helper component to safely inject JSON-LD into the page head/body.
 */
export function JsonLdScript({ data }: { data: object | null | undefined }) {
  if (!data) return null;

  return React.createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  });
}
