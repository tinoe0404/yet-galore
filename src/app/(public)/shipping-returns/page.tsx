import React from 'react';
import { Metadata } from 'next';
import { DisplayText, Heading, BodyText } from '@/components/ui/Typography';

export const metadata: Metadata = {
  title: 'Shipping & Returns | Yet Galore',
  description: 'Information about our worldwide shipping, 14-day returns policy, and product care instructions.',
};

export default function ShippingReturnsPage() {
  return (
    <main className="w-full bg-background min-h-screen pt-32 pb-24">
      <div className="container-narrow px-6 lg:px-12 mx-auto">
        <div className="text-center mb-16">
          <DisplayText as="h1" className="text-4xl md:text-5xl lg:text-6xl">
            Shipping & Returns
          </DisplayText>
        </div>

        <div className="space-y-16 max-w-3xl mx-auto">
          {/* Shipping */}
          <section className="space-y-6">
            <Heading as="h2">Shipping</Heading>
            <BodyText className="leading-relaxed">
              We ship worldwide. Standard delivery is 7–14 business days. Express options are available at checkout.
            </BodyText>
          </section>

          <div className="w-12 h-[1px] bg-border" />

          {/* Returns */}
          <section className="space-y-6">
            <Heading as="h2">Returns</Heading>
            <BodyText className="leading-relaxed">
              We accept returns within 14 days of delivery. Items must be unworn and in original packaging. Contact <a href="mailto:[xavidasante@gmail.com]">[xavidasante@gmail.com]</a> to initiate a return.
            </BodyText>
          </section>

          <div className="w-12 h-[1px] bg-border" />

          {/* Care */}
          <section className="space-y-6">
            <Heading as="h2">Care</Heading>
            <BodyText className="leading-relaxed">
              Each piece is handmade. Please follow the care instructions included with your order.
            </BodyText>
          </section>
        </div>
      </div>
    </main>
  );
}
