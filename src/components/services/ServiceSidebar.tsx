import React from "react";
import Link from "next/link";
import { ArrowRight, Phone, MessageSquare, ShieldCheck, CheckCircle2, Sparkles, Globe } from "lucide-react";
import { siteSettings } from "@/data/settings";
import { Service } from "@/types/content";
import { getServiceBySlug } from "@/data";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";

export interface ServiceSidebarProps {
  currentSlug: string;
  relatedServices: Service[];
}

export function ServiceSidebar({
  currentSlug,
  relatedServices,
}: ServiceSidebarProps) {
  const cleanPhone = siteSettings.phone.replace(/[^0-9+]/g, "");
  const cleanWa = siteSettings.wa.replace(/[^0-9]/g, "");

  const currentService = getServiceBySlug(currentSlug);
  const isIT = currentService?.category === "it-digital";
  const isUS = currentService?.category === "us-corporate";

  // Prioritize related services from the same category
  const sortedRelated = [...relatedServices].sort((a, b) => {
    const aSame = a.category === currentService?.category ? -1 : 1;
    const bSame = b.category === currentService?.category ? -1 : 1;
    return aSame - bSame;
  });

  return (
    <aside className="space-y-8 sticky top-24">
      {/* 1. "Need this service?" CTA Card */}
      <Card className="p-7 sm:p-8 bg-gradient-to-br from-royal-dark to-royal text-white border-0 shadow-soft-lg space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-md">
            {isIT ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-lime-bright" />
                <span>Modern Technology Advisory</span>
              </>
            ) : isUS ? (
              <>
                <Globe className="w-3.5 h-3.5 text-lime-bright" />
                <span>US Corporate Specialist</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-lime-bright" />
                <span>Certified ITP Advisory</span>
              </>
            )}
          </div>

          <h3 className="font-display font-extrabold text-2xl text-white leading-tight">
            {isIT
              ? "Ready to Build Your Solution?"
              : isUS
              ? "Start Your US Business Today"
              : "Need Expert Assistance?"}
          </h3>

          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
            {isIT
              ? "Accelerate your business with bespoke software, high-performing websites, and high-ROI digital campaigns tailored to your goals."
              : isUS
              ? "Form your US LLC or Corporation, obtain your EIN/ITIN, and open a business bank account remotely with complete regulatory compliance."
              : "Avoid penalties, notices, and procedural delays. Our certified tax practitioners handle your filing with 100% legal compliance."}
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <Button
            href="/#contact"
            variant="lime"
            size="md"
            className="w-full justify-center text-slate-950 font-bold"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {isIT
              ? "Request Project Consultation"
              : isUS
              ? "Start US Formation"
              : "Book Free Consultation"}
          </Button>

          <a
            href={`https://wa.me/${cleanWa}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors border border-white/20"
          >
            <MessageSquare className="w-4 h-4 text-lime-bright" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <div className="pt-4 border-t border-white/15 flex items-center justify-between text-[11px] text-blue-200">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-lime-bright" />
            <span>Fast Turnaround</span>
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-lime-bright" />
            <span>Dedicated Support</span>
          </span>
        </div>
      </Card>

      {/* 2. Related Services List */}
      {sortedRelated.length > 0 && (
        <Card className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h3 className="font-display font-bold text-base text-ink border-b border-slate-100 dark:border-slate-800 pb-3">
            {isIT ? "Related Technology Services" : "Related Advisory Services"}
          </h3>

          <ul className="space-y-2">
            {sortedRelated.slice(0, 6).map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-royal dark:hover:text-royal-light transition-colors group"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <div className="w-6 h-6 rounded-lg bg-royal/10 text-royal dark:bg-royal/20 dark:text-royal-light flex items-center justify-center shrink-0">
                      <Icon name={service.icon} className="w-3.5 h-3.5" />
                    </div>
                    <span className="truncate">{service.title}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-royal group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* 3. Direct Contact Card */}
      <Card className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-3">
        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
          Direct Office Inquiries
        </h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <Phone className="w-3.5 h-3.5 text-royal shrink-0" />
            <a href={`tel:${cleanPhone}`} className="hover:text-royal font-semibold">
              {siteSettings.phone}
            </a>
          </div>
          <div className="text-[11px] text-slate-500 pt-1">
            Available {siteSettings.hours}
          </div>
        </div>
      </Card>
    </aside>
  );
}

export default ServiceSidebar;
