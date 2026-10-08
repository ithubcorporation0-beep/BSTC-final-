import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { siteSettings } from "@/data/settings";
import { getActiveServices } from "@/data";

// Clean inline SVGs for brand social networks
function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LinkedinIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.6a1.64 1.64 0 0 0-1.66 1.64c0 .9.74 1.63 1.66 1.63a1.64 1.64 0 0 0 1.64-1.63c0-.9-.74-1.64-1.64-1.64Z" />
    </svg>
  );
}

function TwitterIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function Footer() {
  const allServices = getActiveServices();
  const taxServices = allServices.filter((s) => s.category === "tax-corporate").slice(0, 5);
  const usServices = allServices.filter((s) => s.category === "us-corporate").slice(0, 5);
  const itServices = allServices.filter((s) => s.category === "it-digital").slice(0, 5);

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "All Services", href: "/#services" },
    { label: "About Us", href: "/#about" },
    { label: "Contact & Location", href: "/#contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];

  // Helper: check if a social link is active (not "#" and not empty) per PRD §9 O10
  const isSocialActive = (url?: string) => Boolean(url && url.trim() !== "" && url !== "#");

  const socials = [
    { name: "Facebook", href: siteSettings.fb, icon: FacebookIcon },
    { name: "LinkedIn", href: siteSettings.li, icon: LinkedinIcon },
    { name: "Twitter", href: siteSettings.tw, icon: TwitterIcon },
    { name: "Instagram", href: siteSettings.ig, icon: InstagramIcon },
    { name: "YouTube", href: siteSettings.yt, icon: YoutubeIcon },
  ].filter((s) => isSocialActive(s.href));

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400">
      {/* Top Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 lg:gap-10">
          {/* Column 1: Company Info & Branding */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal rounded-xl p-1">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-900 border border-slate-700/60 p-0.5 shrink-0">
                <Image
                  src="/images/bstc-logo-badge.svg"
                  alt="BSTC Official Logo"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-xl text-ink leading-none">
                  {siteSettings.siteName}
                </span>
                <span className="text-[10px] font-bold text-lime-700 dark:text-lime-400 tracking-wider uppercase mt-0.5">
                  Tax, Corporate &amp; IT Solutions
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {siteSettings.footerText}
            </p>

            {/* Registered ITP Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-royal dark:text-royal-light shadow-sm">
              <ShieldCheck className="w-4 h-4 text-lime-700 dark:text-lime-400" />
              <span>Registered Income Tax Practitioner (ITP)</span>
            </div>

            {/* Social Icons (Only render if active URL, per PRD §9 O10) */}
            {socials.length > 0 && (
              <div className="flex items-center gap-3 pt-2">
                {socials.map((soc) => {
                  const IconComp = soc.icon;
                  return (
                    <a
                      key={soc.name}
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={soc.name}
                      className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-royal hover:border-royal flex items-center justify-center transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal"
                    >
                      <IconComp className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Column 2: Tax & Corporate Advisory */}
          <div>
            <h3 className="font-display font-bold text-base text-ink mb-4">
              Tax &amp; Corporate Advisory
            </h3>
            <ul className="space-y-2.5 text-sm">
              {taxServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-royal dark:hover:text-royal-light transition-colors flex items-center gap-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal rounded p-0.5"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-royal group-hover:translate-x-0.5 transition-all" />
                    <span>{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: US Corporate Services */}
          <div>
            <h3 className="font-display font-bold text-base text-ink mb-4">
              US Corporate Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {usServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-royal dark:hover:text-royal-light transition-colors flex items-center gap-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal rounded p-0.5"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-blue-500 group-hover:text-royal group-hover:translate-x-0.5 transition-all" />
                    <span>{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: IT & Digital Solutions */}
          <div>
            <h3 className="font-display font-bold text-base text-ink mb-4">
              IT &amp; Digital Solutions
            </h3>
            <ul className="space-y-2.5 text-sm">
              {itServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-royal dark:hover:text-royal-light transition-colors flex items-center gap-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal rounded p-0.5"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 group-hover:text-royal group-hover:translate-x-0.5 transition-all" />
                    <span>{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Contact & Office */}
          <div>
            <h3 className="font-display font-bold text-base text-ink mb-4">
              Offices &amp; Inquiries
            </h3>
            <div className="space-y-3 text-xs">
              {siteSettings.offices && siteSettings.offices.length > 0 ? (
                siteSettings.offices.map((off) => (
                  <div
                    key={off.city}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-bold text-ink text-xs flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-royal shrink-0" />
                        {off.city} Office
                      </span>
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-royal/10 text-royal dark:bg-royal/20 dark:text-royal-light">
                        {off.name.includes("Main") ? "Main" : "Branch"}
                      </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed break-words">
                      {off.address}
                    </p>
                    <div className="mt-2 pt-1.5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-1.5 text-[11px]">
                      <a
                        href={`tel:${off.phone.replace(/[^0-9+]/g, "")}`}
                        className="font-bold text-ink hover:text-royal dark:hover:text-royal-light transition-colors inline-flex items-center gap-1 py-0.5"
                      >
                        <Phone className="w-3 h-3 text-royal" />
                        <span>{off.phone}</span>
                      </a>
                      {off.lead && (
                        <span className="text-[10px] text-lime-700 dark:text-lime-400 font-semibold truncate max-w-[150px]">
                          {off.lead.split(" (")[0]}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-royal shrink-0 mt-1" />
                    <span>{siteSettings.address}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-royal shrink-0" />
                    <a
                      href={`tel:${siteSettings.phone.replace(/[^0-9+]/g, "")}`}
                      className="hover:text-royal dark:hover:text-royal-light transition-colors font-medium focus-visible:outline-none focus-visible:underline"
                    >
                      {siteSettings.phone}
                    </a>
                  </li>
                </ul>
              )}

              <div className="pt-1 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-royal shrink-0" />
                  <a
                    href={`mailto:${siteSettings.email}`}
                    className="hover:text-royal dark:hover:text-royal-light transition-colors font-medium break-all"
                  >
                    {siteSettings.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-royal shrink-0" />
                  <span>{siteSettings.hours}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-slate-200/80 dark:border-slate-800/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>{siteSettings.copyright}</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link
              href="/"
              className="hover:text-royal dark:hover:text-royal-light transition-colors focus-visible:outline-none focus-visible:underline"
            >
              Home
            </Link>
            <Link
              href="/#services"
              className="hover:text-royal dark:hover:text-royal-light transition-colors focus-visible:outline-none focus-visible:underline"
            >
              Services
            </Link>
            <Link
              href="/#about"
              className="hover:text-royal dark:hover:text-royal-light transition-colors focus-visible:outline-none focus-visible:underline"
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="hover:text-royal dark:hover:text-royal-light transition-colors focus-visible:outline-none focus-visible:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-royal dark:hover:text-royal-light transition-colors focus-visible:outline-none focus-visible:underline"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
