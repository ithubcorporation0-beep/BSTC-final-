"use client";

import React, { useState, useMemo } from "react";
import { ArrowRight, Sparkles, Building2, Globe, Code2 } from "lucide-react";
import { getActiveServices } from "@/data";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";

type CategoryFilter = "all" | "tax-corporate" | "us-corporate" | "it-digital";

export function ServicesGrid() {
  const allServices = getActiveServices();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const filteredServices = useMemo(() => {
    if (activeCategory === "all") return allServices;
    return allServices.filter((s) => s.category === activeCategory);
  }, [allServices, activeCategory]);

  const counts = useMemo(() => {
    const taxCount = allServices.filter((s) => s.category === "tax-corporate").length;
    const usCount = allServices.filter((s) => s.category === "us-corporate").length;
    const itCount = allServices.filter((s) => s.category === "it-digital").length;
    return {
      all: allServices.length,
      tax: taxCount,
      us: usCount,
      it: itCount,
    };
  }, [allServices]);

  return (
    <Section
      id="services"
      eyebrow="Our Practice Areas"
      heading="Full-Spectrum Corporate, Tax & Technology Solutions"
      description="From FBR tax filings and SECP registrations to US corporate formations, custom software development, modern websites, and performance digital marketing."
      centered
      className="py-20 lg:py-28"
    >
      {/* Category Filter Tab Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-14">
        <button
          type="button"
          onClick={() => setActiveCategory("all")}
          className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
            activeCategory === "all"
              ? "bg-royal text-white shadow-soft scale-105"
              : "bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>All Services</span>
          <span
            className={`ml-1 text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-full font-extrabold ${
              activeCategory === "all"
                ? "bg-white/20 text-white"
                : "bg-slate-200 dark:bg-slate-750 text-slate-700 dark:text-slate-300"
            }`}
          >
            {counts.all}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveCategory("tax-corporate")}
          className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
            activeCategory === "tax-corporate"
              ? "bg-royal text-white shadow-soft scale-105"
              : "bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
          }`}
        >
          <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Tax &amp; Corporate</span>
          <span
            className={`ml-1 text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-full font-extrabold ${
              activeCategory === "tax-corporate"
                ? "bg-white/20 text-white"
                : "bg-slate-200 dark:bg-slate-750 text-slate-700 dark:text-slate-300"
            }`}
          >
            {counts.tax}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveCategory("us-corporate")}
          className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
            activeCategory === "us-corporate"
              ? "bg-royal text-white shadow-soft scale-105"
              : "bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
          }`}
        >
          <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-300" />
          <span>US Corporate</span>
          <span
            className={`ml-1 text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-full font-extrabold ${
              activeCategory === "us-corporate"
                ? "bg-white/20 text-white"
                : "bg-slate-200 dark:bg-slate-750 text-slate-700 dark:text-slate-300"
            }`}
          >
            {counts.us}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveCategory("it-digital")}
          className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
            activeCategory === "it-digital"
              ? "bg-royal text-white shadow-soft scale-105"
              : "bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
          }`}
        >
          <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-lime-bright" />
          <span>IT &amp; Digital</span>
          <span
            className={`ml-1 text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-full font-extrabold ${
              activeCategory === "it-digital"
                ? "bg-white/20 text-white"
                : "bg-slate-200 dark:bg-slate-750 text-slate-700 dark:text-slate-300"
            }`}
          >
            {counts.it}
          </span>
        </button>
      </div>

      {/* Services Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
        {filteredServices.map((service, index) => {
          const isIT = service.category === "it-digital";
          const isUS = service.category === "us-corporate";

          return (
            <Reveal
              key={service.slug}
              delay={(index % 4) * 80}
              className="h-full"
            >
              <Card
                href={`/services/${service.slug}`}
                className="h-full flex flex-col justify-between p-5 sm:p-6 hover:border-royal/40 dark:hover:border-royal-light/40 group overflow-hidden transition-all duration-300 hover:shadow-soft-lg relative"
              >
                <div>
                  {/* Top Badge & Icon Row */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-royal/10 dark:bg-royal/20 text-royal dark:text-royal-light flex items-center justify-center border border-royal/15 dark:border-royal/30 group-hover:bg-royal group-hover:text-white dark:group-hover:bg-royal-light dark:group-hover:text-slate-950 transition-all duration-300 shadow-soft">
                      <Icon name={service.icon} className="w-6 h-6" />
                    </div>

                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                        isIT
                          ? "bg-lime-50 dark:bg-lime-950/40 text-lime-800 dark:text-lime-300 border-lime-200 dark:border-lime-800/60"
                          : isUS
                          ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/60"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      {isIT ? "Technology" : isUS ? "US Corporate" : "Corporate"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-base sm:text-lg text-ink group-hover:text-royal dark:group-hover:text-royal-light transition-colors leading-snug">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {service.desc}
                  </p>
                </div>

                {/* Action Link Footer */}
                <div className="pt-4 mt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-royal dark:text-royal-light group-hover:text-royal-dark dark:group-hover:text-white transition-colors">
                  <span>View Full Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

export default ServicesGrid;


