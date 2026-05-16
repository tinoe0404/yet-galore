import React from 'react';
import { Metadata } from 'next';
import { DisplayText, BodyText } from '@/components/ui/Typography';
import siteProfile from '@/data/siteProfile.json';

export const metadata: Metadata = {
  title: 'Privacy Policy | Yet Galore',
  description: 'Privacy Policy for Yet Galore.',
};

export default function PrivacyPage() {
  return (
    <div className="w-full min-h-screen bg-background pt-24 pb-32">
      <div className="container-wide px-6 lg:px-12 max-w-3xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <DisplayText as="h1" className="text-4xl md:text-6xl mb-6">Privacy Policy</DisplayText>
          <BodyText className="text-muted text-lg">
            How we handle your information with care and transparency.
          </BodyText>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="font-display text-2xl md:text-3xl mb-4">Information We Collect</h2>
            <BodyText className="text-black/80 leading-relaxed">
              We collect minimal personal information necessary to process your enquiries and orders. This typically includes your name, email address, phone number, and shipping details when you interact with our catalogue. We do not use intrusive tracking or automated marketing cookies on our website.
            </BodyText>
          </section>

          <section>
            <h2 className="font-display text-2xl md:text-3xl mb-4">How We Use It</h2>
            <BodyText className="text-black/80 leading-relaxed">
              Your information is strictly used to fulfill your requests, manage orders, and provide customer support. We may contact you regarding an enquiry you have placed or to provide updates on your purchase. We will never sell, rent, or inappropriately share your personal data with third parties.
            </BodyText>
          </section>

          <section>
            <h2 className="font-display text-2xl md:text-3xl mb-4">WhatsApp & Social Enquiries</h2>
            <BodyText className="text-black/80 leading-relaxed">
              When you reach out to us via WhatsApp, Instagram, or TikTok, your communication is handled through those respective platforms. We use the details you provide during these conversations solely to assist you with your specific query or order. Please review the privacy policies of these third-party platforms for information on how they process your data.
            </BodyText>
          </section>

          <section>
            <h2 className="font-display text-2xl md:text-3xl mb-4">Data Retention</h2>
            <BodyText className="text-black/80 leading-relaxed">
              We retain your contact and order details only for as long as necessary to provide our services and maintain accurate business records. Once your information is no longer needed for these purposes, it is securely deleted or anonymized. You may request the removal of your personal data at any time by contacting us directly.
            </BodyText>
          </section>

          <section>
            <h2 className="font-display text-2xl md:text-3xl mb-4">Contact</h2>
            <BodyText className="text-black/80 leading-relaxed">
              If you have any questions or concerns regarding this Privacy Policy, please reach out to us. You can email us at <a href={`mailto:${siteProfile.email}`} className="underline hover:text-black/70 transition-colors">{siteProfile.email}</a> or message us on WhatsApp at <a href={siteProfile.whatsapp} className="underline hover:text-black/70 transition-colors" target="_blank" rel="noreferrer">our official number</a>. We are always happy to help.
            </BodyText>
          </section>
        </div>
      </div>
    </div>
  );
}
