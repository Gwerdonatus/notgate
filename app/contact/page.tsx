"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { siteConfig, presence } from "@/data/site-data";
import { MapPin, Mail, Phone, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", company: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      {/* Contact Form Section */}
      <section className="relative pt-28 sm:pt-32 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="p-8 sm:p-10 lg:p-12 rounded-3xl" style={{ background: "#ffffff", boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              {/* Left: Info */}
              <AnimatedSection>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight mb-8" style={{ color: "#111111" }}>
                  Get In Touch
                </h1>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-sm mb-2" style={{ color: "#111111" }}>Head Office</h3>
                    <p className="text-sm" style={{ color: "#6b7280" }}>{siteConfig.address}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2" style={{ color: "#6b7280" }}>
                      <Mail className="w-4 h-4 text-primary" />
                      <a href={`mailto:${siteConfig.email}`} className="text-sm transition-colors">{siteConfig.email}</a>
                    </div>
                    <div className="flex items-center gap-2" style={{ color: "#6b7280" }}>
                      <Phone className="w-4 h-4 text-primary" />
                      <a href={`tel:${siteConfig.phone.replace(/ /g, "")}`} className="text-sm transition-colors">{siteConfig.phone}</a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Right: Form */}
              <AnimatedSection delay={0.15}>
                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Send className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-1" style={{ color: "#111111" }}>Message Sent!</h3>
                    <p className="text-sm" style={{ color: "#9ca3af" }}>We will get back to you shortly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: "#111111" }}>Name <span style={{ color: "#e8431e" }}>*</span></label>
                        <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-0 py-3 text-sm bg-transparent focus:outline-none transition-all" style={{ color: "#111111", borderBottom: "1px solid #e5e7eb" }} onFocus={(e) => e.currentTarget.style.borderBottomColor = "#e8431e"} onBlur={(e) => e.currentTarget.style.borderBottomColor = "#e5e7eb"} placeholder="Your name" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: "#111111" }}>Company <span style={{ color: "#e8431e" }}>*</span></label>
                        <input type="text" required value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-0 py-3 text-sm bg-transparent focus:outline-none transition-all" style={{ color: "#111111", borderBottom: "1px solid #e5e7eb" }} onFocus={(e) => e.currentTarget.style.borderBottomColor = "#e8431e"} onBlur={(e) => e.currentTarget.style.borderBottomColor = "#e5e7eb"} placeholder="Your company" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: "#111111" }}>E-mail <span style={{ color: "#e8431e" }}>*</span></label>
                      <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-0 py-3 text-sm bg-transparent focus:outline-none transition-all" style={{ color: "#111111", borderBottom: "1px solid #e5e7eb" }} onFocus={(e) => e.currentTarget.style.borderBottomColor = "#e8431e"} onBlur={(e) => e.currentTarget.style.borderBottomColor = "#e5e7eb"} placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: "#111111" }}>Message</label>
                      <textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none" placeholder="Tell us about your project..." />
                    </div>
                    <button type="submit" className="w-full sm:w-auto px-12 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02]" style={{ background: "transparent", color: "#333333", border: "1px solid #333333" }} onMouseEnter={(e) => { e.currentTarget.style.background = "#333333"; e.currentTarget.style.color = "#ffffff"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#333333"; }}>
                      SUBMIT
                    </button>
                  </form>
                )}
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Presence Section */}
      <section className="section-padding py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          <div className="p-8 sm:p-10 lg:p-12 rounded-3xl" style={{ background: "#ffffff", boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              <AnimatedSection>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight mb-8" style={{ color: "#111111" }}>
                  Our presence
                </h2>
                <div className="space-y-4">
                  <div className="p-5 rounded-xl" style={{ background: "#f9fafb", border: "1px solid #f0f0f0" }}>
                    <h4 className="font-semibold text-sm mb-1" style={{ color: "#111111" }}>Head office</h4>
                    <p className="text-sm" style={{ color: "#9ca3af" }}>{presence.headOffice}</p>
                  </div>
                  <div className="p-5 rounded-xl" style={{ background: "#f9fafb", border: "1px solid #f0f0f0" }}>
                    <h4 className="font-semibold text-sm mb-1" style={{ color: "#111111" }}>Branch offices</h4>
                    <p className="text-sm" style={{ color: "#9ca3af" }}>{presence.branchOffices}</p>
                  </div>
                  <div className="p-5 rounded-xl" style={{ background: "#f9fafb", border: "1px solid #f0f0f0" }}>
                    <h4 className="font-semibold text-sm mb-1" style={{ color: "#111111" }}>Group offices</h4>
                    <p className="text-sm" style={{ color: "#9ca3af" }}>{presence.groupOffices}</p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <div className="relative aspect-square rounded-2xl overflow-hidden" style={{ background: "#f5f5f0", border: "1px solid #e5e7eb" }}>
                  {/* Simplified Africa map representation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg viewBox="0 0 400 400" className="w-full h-full">
                      {/* Africa outline */}
                      <path d="M180 60 Q200 50 220 60 L240 80 L250 120 L280 150 L300 200 L290 250 L260 300 L220 340 L180 350 L140 340 L100 300 L80 250 L70 200 L80 150 L100 120 L120 80 L140 60 Q160 50 180 60Z"
                        fill="#f0f0f0" stroke="#ddd" strokeWidth="1"/>
                      {/* Highlighted countries */}
                      <path d="M140 120 L160 110 L170 130 L160 150 L140 140Z" fill="#F47C20" opacity="0.8"/>
                      <path d="M180 100 L200 95 L210 115 L200 135 L180 130Z" fill="#F47C20" opacity="0.6"/>
                      <path d="M220 110 L240 105 L250 125 L240 145 L220 140Z" fill="#F47C20" opacity="0.7"/>
                      <path d="M160 180 L180 175 L190 195 L180 215 L160 210Z" fill="#F47C20" opacity="0.5"/>
                      <path d="M200 200 L230 195 L240 220 L230 245 L200 240Z" fill="#F47C20" opacity="0.9"/>
                    </svg>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Head Office Map */}
      <section className="section-padding py-6 sm:py-8 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="p-8 sm:p-10 lg:p-12 rounded-3xl" style={{ background: "#ffffff", boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)" }}>
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight mb-6" style={{ color: "#111111" }}>
                Our Head Office
              </h2>
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden" style={{ border: "1px solid #e5e7eb" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.6!2d3.436!3d6.455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjcnMTguMCJOIDPCsDI2JzEwLjAiRQ!5e0!3m2!1sen!2sng!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: "absolute", inset: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="NOTGATE Head Office"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}