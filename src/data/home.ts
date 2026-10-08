import { HomeContent } from "@/types/content";

/**
 * Static Homepage Content Model.
 * Consumed by homepage sections in `src/app/page.tsx`.
 */
export const homeContent: HomeContent = {
  hero: {
    title: "BUSINESS SOLUTIONS TAX CONSULTANTS",
    subtitle: "Value Added To Your Business",
    cta: "Book Free Consultation",
    ctaLink: "#contact",
    secondaryCta: "Explore All Services",
    secondaryCtaLink: "#services",
    bg: "",
  },
  stats: [
    { label: "Years Experience", value: 20, suffix: "+" },
    { label: "Clients Served", value: 15000, suffix: "+" },
    { label: "Projects Completed", value: 24000, suffix: "+" },
    { label: "Returns Filed", value: 45000, suffix: "+" },
  ],
  about: {
    title: "About Business Solutions Tax Consultants",
    intro:
      "BSTC is a full-service advisory firm providing professional tax consultancy, SECP company registrations, US corporate formations, and innovative IT & digital solutions. Led by experienced professionals, we help businesses simplify compliance, improve efficiency, and grow with confidence.",
    desc:
      "For over two decades, BSTC has helped salaried individuals, freelancers, commercial traders, startups, and established enterprises navigate tax compliance, SECP registrations, US LLC formations, corporate bookkeeping, and financial reporting with total confidence.\n\nTo accelerate your business in today's global and digital economy, we also provide full-suite US Corporate Services (LLCs, EINs, banking, and compliance) and cutting-edge IT & Digital Solutions — including custom software development, modern high-converting websites, digital marketing & SEO, brand identity design, and scalable e-commerce solutions. From legal incorporation to digital market leadership, BSTC is your all-in-one business growth partner.",
    img: "/images/bstc-logo-badge.svg",
    cards: [
      {
        title: "Registered ITP Leadership",
        desc: "Direct advisory by certified Income Tax Practitioners registered with regulatory authorities.",
      },
      {
        title: "Domestic & US Corporate Services",
        desc: "From NTN issuance and SECP registrations to US LLC formations, EINs, and bank accounts.",
      },
      {
        title: "Comprehensive IT & Digital Solutions",
        desc: "Custom enterprise software, modern web portals, digital marketing, branding, and e-commerce.",
      },
      {
        title: "100% Digital Convenience",
        desc: "Secure online document submission, remote processing, and transparent updates.",
      },
    ],
  },
  why: [
    {
      icon: "ShieldCheck",
      title: "Licensed Practitioners",
      desc: "Direct counsel from certified Income Tax Practitioners (ITPs) with over a decade of hands-on regulatory experience.",
    },
    {
      icon: "Clock",
      title: "Prompt Turnaround",
      desc: "Fast processing times for NTN generation, company incorporation, and urgent monthly tax filings.",
    },
    {
      icon: "Scale",
      title: "Transparent & Fair Pricing",
      desc: "Clear, upfront fee structure with zero hidden surprise charges or undisclosed expenses.",
    },
    {
      icon: "FileText",
      title: "100% Audit-Proof Accuracy",
      desc: "Meticulous documentation and calculation ensuring total adherence to FBR, SECP, and provincial laws.",
    },
    {
      icon: "Users",
      title: "Dedicated Account Manager",
      desc: "Personalized attention with a direct point of contact for ongoing accounting and tax queries.",
    },
    {
      icon: "Sparkles",
      title: "Multi-Jurisdiction Coverage",
      desc: "Comprehensive expertise across federal FBR and provincial authorities including PRA, SRB, KPRA, and BRA.",
    },
  ],
  faqs: [
    {
      q: "How long does SECP private limited company registration take?",
      a: "Standard SECP company registration takes approximately 3 to 5 business days once all subscriber CNICs, proposed business names, and documentation are submitted through the eServices portal.",
    },
    {
      q: "Can I visit your office physically for tax filing and consultations?",
      a: "Yes, physical visits and in-person consultations are readily available at both our Main Office in Mardan and Branch Office in Swat. Clients across Pakistan and abroad can also complete consultations, document submissions, and filings digitally via our secure channels and WhatsApp.",
    },
    {
      q: "What is Active Taxpayer List (ATL) status and why does it matter?",
      a: "Being on the Active Taxpayer List (ATL) gives individuals and companies significant tax benefits, including reduced withholding tax rates on banking transactions, vehicle token tax, and property transfers. Non-filers are subject to double withholding rates.",
    },
    {
      q: "Can you assist with provincial sales tax across different provinces?",
      a: "Yes, we handle provincial sales tax on services across all provincial authorities in Pakistan, including PRA (Punjab), SRB (Sindh), KPRA (Khyber Pakhtunkhwa), and BRA (Balochistan).",
    },
    {
      q: "Are there any hidden costs in your consultation or filing fees?",
      a: "No. We believe in 100% transparent pricing and provide a comprehensive itemized quote before initiating any filing, registration, or advisory assignment.",
    },
    {
      q: "What IT and digital solutions does BSTC offer to businesses?",
      a: "Beyond tax and corporate advisory, BSTC provides full-spectrum enterprise IT services: custom software solutions and ERP development, modern responsive websites, digital marketing and SEO campaigns, graphic design and branding, and e-commerce platforms serving businesses all over the world.",
    },
    {
      q: "Can BSTC assist non-residents with US LLC formation and business bank accounts?",
      a: "Yes. We offer end-to-end US Corporate Services for international and non-resident founders — including LLC and C-Corp formation (Wyoming, Delaware, Florida, etc.), IRS EIN/ITIN procurement, Registered Agent services, remote business bank account opening (Mercury, Relay, Wise), and annual compliance filing.",
    },
  ],
  testimonials: [
    {
      name: "Omar Farooq", // TODO(O13): real client testimonial from client
      comp: "Founder, Apex Logistics", // TODO(O13): real client testimonial from client
      rating: 5,
      text: "BSTC made our corporate company registration and NTN procurement completely painless. Javed Hussain, Hassan Zeb, and the entire team are exceptionally knowledgeable and responsive.",
    },
    {
      name: "Ali Raza", // TODO(O13): real client testimonial from client
      comp: "Director, NexGen Software", // TODO(O13): real client testimonial from client
      rating: 5,
      text: "Professional, fast, and transparent. BSTC has handled our monthly sales tax and annual corporate filings for three consecutive years without a single hiccup.",
    },
    {
      name: "Tariq Mahmood", // TODO(O13): real client testimonial from client
      comp: "Owner, Mahmood Trading Co", // TODO(O13): real client testimonial from client
      rating: 5,
      text: "Their team resolved our lingering tax audit notices and got our business onto the Active Taxpayer List within days. Exceptional service quality.",
    },
  ],
};
