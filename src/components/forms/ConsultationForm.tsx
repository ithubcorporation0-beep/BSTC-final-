"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
  MessageSquare,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { getActiveServices } from "@/data";
import { siteSettings } from "@/data/settings";
import {
  validateConsultationForm,
  ConsultationFormData,
  FormValidationErrors,
} from "@/lib/validation";
import Button from "@/components/ui/Button";

const INITIAL_FORM_STATE: ConsultationFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  service: "",
  message: "",
  company: "",
};

export function ConsultationForm() {
  const activeServices = getActiveServices();
  const taxServices = activeServices.filter((s) => s.category === "tax-corporate");
  const usServices = activeServices.filter((s) => s.category === "us-corporate");
  const itServices = activeServices.filter((s) => s.category === "it-digital");
  const cleanWa = siteSettings.wa.replace(/[^0-9]/g, "");

  const [formData, setFormData] = useState<ConsultationFormData>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string>("");
  const [liveMessage, setLiveMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);

    // If field was already touched, re-validate to clear errors as user types
    if (touched[name]) {
      const validation = validateConsultationForm(updated);
      setErrors(validation.errors);
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const validation = validateConsultationForm(formData);
    setErrors(validation.errors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {
      firstName: true,
      lastName: true,
      phone: true,
      email: true,
      service: true,
      message: true,
    };
    setTouched(allTouched);

    // Run full client validation
    const validation = validateConsultationForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setServerError("Please resolve the highlighted form errors before submitting.");
      setLiveMessage("Form submission failed. Please check the highlighted fields.");
      return;
    }

    setStatus("submitting");
    setServerError("");
    setLiveMessage("Submitting your consultation request...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.sanitizedData || formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setServerError(
          data.error ||
            "Unable to deliver your consultation request. Please reach us directly on WhatsApp or phone."
        );
        if (data.errors) {
          setErrors(data.errors);
        }
        setLiveMessage("Submission failed. An error occurred.");
        return;
      }

      // Success
      setStatus("success");
      setLiveMessage(
        "Consultation request submitted successfully. Our advisory team will contact you within 2 business hours."
      );
    } catch (err) {
      console.error("[ConsultationForm Submit Error]:", err);
      setStatus("error");
      setServerError(
        "Network connection error. Please check your internet connection or message our advisory team directly on WhatsApp."
      );
      setLiveMessage("Submission failed due to a network error.");
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
    setTouched({});
    setStatus("idle");
    setServerError("");
    setLiveMessage("");
  };

  return (
    <div className="space-y-6">
      {/* Screen Reader Live Announcement Region */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {liveMessage}
      </div>

      {/* Success State Screen */}
      {status === "success" ? (
        <div className="text-center py-10 px-4 sm:px-8 space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-ink">
              Consultation Request Received!
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{formData.firstName}</strong>. Javid Hussain (Director), Hassan Zeb (CEO &amp; ITP), and our advisory desk have received your request.
            </p>
          </div>

          {/* What happens next card */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-left max-w-md mx-auto space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-royal dark:text-royal-light flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>What Happens Next</span>
            </h4>
            <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="font-bold text-ink">1.</span>
                <span>Our consultants review your filing/incorporation requirements.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-ink">2.</span>
                <span>We contact you at <strong>{formData.phone}</strong> within <strong>2 business hours</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-ink">3.</span>
                <span>We provide a transparent quote and documentation roadmap.</span>
              </li>
            </ul>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 text-xs font-bold text-royal dark:text-royal-light hover:underline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Submit another inquiry</span>
            </button>
          </div>
        </div>
      ) : (
        /* Interactive Consultation Form */
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Server Error Alert with WhatsApp Fallback */}
          {status === "error" && (
            <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-900 dark:text-red-200 space-y-3">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm leading-relaxed">
                  <strong>Submission Notice:</strong> {serverError}
                </div>
              </div>
              <div className="pt-1">
                <a
                  href={`https://wa.me/${cleanWa}?text=Hello%20BSTC,%20I%20tried%20submitting%20the%20website%20consultation%20form%20for%20assistance.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Reach us directly on WhatsApp</span>
                </a>
              </div>
            </div>
          )}

          {/* Anti-Spam Honeypot Field (Visually Hidden, not display:none) */}
          <div
            className="absolute opacity-0 -z-50 pointer-events-none h-0 w-0 overflow-hidden"
            aria-hidden="true"
          >
            <label htmlFor="company-field">Company Organization</label>
            <input
              id="company-field"
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Name Row (First Name & Last Name) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* First Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="firstName"
                className="block text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.firstName)}
                aria-describedby={errors.firstName ? "firstName-error" : undefined}
                placeholder="Muhammad"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white dark:bg-slate-900 text-ink placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.firstName
                    ? "border-red-500 focus:ring-red-400"
                    : "border-slate-200 dark:border-slate-700 focus:border-royal focus:ring-royal/20"
                }`}
              />
              {errors.firstName && (
                <p id="firstName-error" className="text-xs text-red-500 mt-1 font-medium">
                  {errors.firstName}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="lastName"
                className="block text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.lastName)}
                aria-describedby={errors.lastName ? "lastName-error" : undefined}
                placeholder="Khan"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white dark:bg-slate-900 text-ink placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.lastName
                    ? "border-red-500 focus:ring-red-400"
                    : "border-slate-200 dark:border-slate-700 focus:border-royal focus:ring-royal/20"
                }`}
              />
              {errors.lastName && (
                <p id="lastName-error" className="text-xs text-red-500 mt-1 font-medium">
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Contact Row (Phone & Email) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone */}
            <div className="space-y-1.5">
              <label
                htmlFor="phone"
                className="block text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                Phone / WhatsApp <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
                placeholder="03001234567"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white dark:bg-slate-900 text-ink placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.phone
                    ? "border-red-500 focus:ring-red-400"
                    : "border-slate-200 dark:border-slate-700 focus:border-royal focus:ring-royal/20"
                }`}
              />
              <p id="phone-hint" className="text-[11px] text-slate-500">
                Format: 03001234567 or +923001234567
              </p>
              {errors.phone && (
                <p id="phone-error" className="text-xs text-red-500 mt-0.5 font-medium">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Email (Optional) */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                Email Address <span className="text-xs font-normal text-slate-400">(Optional)</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                placeholder="client@example.com"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white dark:bg-slate-900 text-ink placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.email
                    ? "border-red-500 focus:ring-red-400"
                    : "border-slate-200 dark:border-slate-700 focus:border-royal focus:ring-royal/20"
                }`}
              />
              {errors.email && (
                <p id="email-error" className="text-xs text-red-500 mt-1 font-medium">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Service Needed (Select Dropdown) */}
          <div className="space-y-1.5">
            <label
              htmlFor="service"
              className="block text-xs font-bold text-slate-700 dark:text-slate-300"
            >
              Service Needed <span className="text-red-500">*</span>
            </label>
            <select
              id="service"
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errors.service)}
              aria-describedby={errors.service ? "service-error" : undefined}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white dark:bg-slate-900 text-ink focus:outline-none focus:ring-2 transition-all ${
                errors.service
                  ? "border-red-500 focus:ring-red-400"
                  : "border-slate-200 dark:border-slate-700 focus:border-royal focus:ring-royal/20"
              }`}
            >
              <option value="">Select a service...</option>
              <optgroup label="Taxation &amp; Corporate Advisory (Pakistan)">
                {taxServices.map((service) => (
                  <option key={service.slug} value={service.slug}>
                    {service.title}
                  </option>
                ))}
              </optgroup>
              <optgroup label="US Corporate Services">
                {usServices.map((service) => (
                  <option key={service.slug} value={service.slug}>
                    {service.title}
                  </option>
                ))}
              </optgroup>
              <optgroup label="IT &amp; Digital Solutions">
                {itServices.map((service) => (
                  <option key={service.slug} value={service.slug}>
                    {service.title}
                  </option>
                ))}
              </optgroup>
              <option value="other">Other Inquiry / Advisory</option>
            </select>
            {errors.service && (
              <p id="service-error" className="text-xs text-red-500 mt-1 font-medium">
                {errors.service}
              </p>
            )}
          </div>

          {/* Message (Optional Textarea) */}
          <div className="space-y-1.5">
            <label
              htmlFor="message"
              className="block text-xs font-bold text-slate-700 dark:text-slate-300"
            >
              Inquiry Details <span className="text-xs font-normal text-slate-400">(Optional)</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              maxLength={1000}
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              placeholder="Briefly describe your company, filing years, or specific requirements..."
              className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white dark:bg-slate-900 text-ink placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all resize-none ${
                errors.message
                  ? "border-red-500 focus:ring-red-400"
                  : "border-slate-200 dark:border-slate-700 focus:border-royal focus:ring-royal/20"
              }`}
            />
            {errors.message && (
              <p id="message-error" className="text-xs text-red-500 mt-1 font-medium">
                {errors.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={status === "submitting"}
              className="w-full justify-center"
              icon={
                status === "submitting" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )
              }
            >
              {status === "submitting" ? "Submitting Inquiry..." : "Book Free Consultation"}
            </Button>
          </div>

          {/* Privacy Disclaimer */}
          <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
            Your data is used solely to respond to your consultation request and is never shared with third parties. Read our{" "}
            <Link
              href="/privacy"
              className="text-royal dark:text-royal-light font-semibold hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </form>
      )}
    </div>
  );
}

export default ConsultationForm;
