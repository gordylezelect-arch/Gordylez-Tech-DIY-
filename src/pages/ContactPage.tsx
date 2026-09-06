import React from 'react';
import { ContactSection } from '../components/ContactSection';
import {
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MessageSquare,
  Wrench,
  Sun,
  Battery
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const faqs = [
    {
      q: 'Can Gordylez Tech DIY help me calculate my off-grid solar and battery requirements?',
      a: 'Yes! You can use our built-in interactive Solar & Battery Sizing Calculator on the website, or reach out directly with your list of appliances, peak wattage, and location to receive specific configuration recommendations.',
    },
    {
      q: 'Do you provide component-level diagnostics for blown inverters?',
      a: 'We share detailed teardown and repair blueprints for common failure points—such as shorted low-side MOSFETs, vaporized gate resistors, and blown gate driver ICs. Contact us with your inverter model and oscilloscope symptoms.',
    },
    {
      q: 'Where do you source Grade-A LiFePO4 cells for battery pack builds?',
      a: 'All our builds feature QR-code verified Grade-A prismatic cells tested for internal resistance (under 0.28mΩ with an RC3563 meter) and capacity tested to at least 100% of nominal rating before pack compression.',
    },
    {
      q: 'Can I request a custom tutorial or video demonstration?',
      a: 'Absolutely! Send us your DIY project ideas, schematics you would like analyzed, or power electronics teardown requests through the message form below or via WhatsApp.',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Contact Section */}
      <ContactSection />

      {/* FAQ Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-2xl border border-white/5 bg-slate-900/50 backdrop-blur-sm p-6 sm:p-10 space-y-8 shadow-xl">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-mono-code font-semibold text-amber-400 mb-2">
              <HelpCircle className="h-3.5 w-3.5" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Workshop & Engineering FAQs
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Common questions about our off-grid solar builds, lithium batteries, and electronics repair procedures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/5 bg-[#0a0a0c]/60 p-5 space-y-2.5"
              >
                <h4 className="text-sm sm:text-base font-bold text-white flex items-start gap-2">
                  <span className="text-amber-500 shrink-0 font-mono-code">Q:</span>
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pl-5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
