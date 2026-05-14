import React from 'react';
import { Metadata } from 'next';
import { DisplayText, BodyText } from '@/components/ui/Typography';
import { ContactForm } from '@/components/public/forms/ContactForm';
import { Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | Yet Galore',
  description: 'Get in touch with the Yet Galore team for product or general enquiries.',
};

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-background pt-24 pb-32">
      <div className="container-wide px-6 lg:px-12">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <DisplayText as="h1" className="text-5xl md:text-7xl mb-6">Get In Touch</DisplayText>
          <BodyText className="text-muted text-lg">
            Whether you have a question about a piece or wish to place an enquiry, we're here.
          </BodyText>
        </div>

        {/* 2-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left: Contact Info */}
          <div className="w-full lg:w-1/3 flex flex-col space-y-12">
            <div>
              <h3 className="font-sans text-xs uppercase tracking-widest text-black/50 mb-6">Contact Information</h3>
              <ul className="space-y-6">
                <li>
                  <a href="mailto:enquiries@yetgalore.com" className="group flex items-center gap-3 font-sans text-sm hover:text-black/70 transition-colors">
                    <Mail className="w-4 h-4 text-muted group-hover:text-black/70 transition-colors" />
                    enquiries@yetgalore.com
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/123456789" target="_blank" rel="noreferrer" className="group flex items-center gap-3 font-sans text-sm hover:text-black/70 transition-colors">
                    <svg className="w-4 h-4 text-muted group-hover:text-black/70 transition-colors" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                    WhatsApp Message
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/yet.galore?igsh=MWl4bTFoMTdwbDA4bw%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className="group flex items-center gap-3 font-sans text-sm hover:text-black/70 transition-colors">
                    <svg className="w-4 h-4 text-muted group-hover:text-black/70 transition-colors" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    @yetgalore
                  </a>
                </li>
                <li>
                  <a href="https://www.tiktok.com/@yet.galore" target="_blank" rel="noreferrer" className="group flex items-center gap-3 font-sans text-sm hover:text-black/70 transition-colors">
                    <svg className="w-4 h-4 text-muted group-hover:text-black/70 transition-colors" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                    @yetgalore
                  </a>
                </li>
              </ul>
            </div>

            <div className="pt-8 border-t border-border">
              <BodyText className="text-sm italic text-black/70">
                We respond to all enquiries within 24 hours during standard business days.
              </BodyText>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="w-full lg:w-2/3">
            <ContactForm />
          </div>

        </div>
      </div>
    </div>
  );
}
