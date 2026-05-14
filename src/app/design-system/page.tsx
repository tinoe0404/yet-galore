import React from 'react';
import { DisplayText, Heading, Subheading, BodyText, Caption, Label, Tag } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Logo } from '@/components/common/Logo';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export default function DesignSystemPage() {
  return (
    <main className="container-narrow section-padding min-h-screen">
      <div className="space-y-24">
        
        {/* Header */}
        <div>
          <Tag>System Reference</Tag>
          <DisplayText className="mt-4">Design Tokens</DisplayText>
          <BodyText className="mt-6 text-muted max-w-xl">
            A reference guide to the core typography, components, and interaction models that compose the Yet Galore editorial interface.
          </BodyText>
        </div>

        <hr className="border-border" />

        {/* Brand */}
        <section className="space-y-8">
          <Subheading>Brand Identity</Subheading>
          <div className="grid grid-cols-2 gap-8 items-center bg-background border border-border p-8">
            <div className="space-y-4">
              <Caption>Dark Mode (Default)</Caption>
              <Logo variant="dark" asLink={false} />
            </div>
            <div className="space-y-4 bg-charcoal p-8">
              <Caption className="text-warm-gray-2">Light Mode</Caption>
              <Logo variant="light" asLink={false} />
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-8">
          <Subheading>Typography Scale</Subheading>
          <div className="space-y-12">
            <div className="space-y-2">
              <Tag>Display Text (H1)</Tag>
              <DisplayText>The Fall Collection</DisplayText>
            </div>
            <div className="space-y-2">
              <Tag>Heading (H2)</Tag>
              <Heading>Curated Essentials</Heading>
            </div>
            <div className="space-y-2">
              <Tag>Subheading (H3)</Tag>
              <Subheading>Exquisite Craftsmanship</Subheading>
            </div>
            <div className="space-y-2 max-w-2xl">
              <Tag>Body Text (P)</Tag>
              <BodyText>
                Each piece is a testament to meticulous craftsmanship and timeless design. We believe in creating garments that transcend seasonal trends, focusing instead on enduring quality and silhouette.
              </BodyText>
            </div>
            <div className="space-y-2">
              <Tag>Caption</Tag>
              <Caption>Handmade in Italy. 100% Calf Leather.</Caption>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* Buttons */}
        <section className="space-y-8">
          <Subheading>Interactive Elements</Subheading>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <Label>Primary Buttons</Label>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary">Shop Collection</Button>
                <Button variant="primary" withArrow>Discover More</Button>
                <Button variant="primary" disabled>Sold Out</Button>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Outline Buttons</Label>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="outline">View Details</Button>
                <Button variant="outline" withArrow>Read Story</Button>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Ghost & Link Buttons</Label>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="ghost">Cancel</Button>
                <Button variant="link">Forgot Password?</Button>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* Inputs */}
        <section className="space-y-8">
          <Subheading>Forms & Inputs</Subheading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Input 
                label="Email Address" 
                placeholder="you@example.com" 
                type="email" 
              />
              <Input 
                label="Password" 
                placeholder="••••••••" 
                type="password" 
              />
            </div>
            <div className="space-y-6">
              <Input 
                label="Discount Code" 
                placeholder="SUMMER24" 
                defaultValue="INVALID"
                error="This code has expired." 
              />
              <div className="space-y-2">
                <Label>Loading State</Label>
                <div className="flex items-center space-x-4 h-12">
                  <LoadingSpinner />
                  <Caption>Processing...</Caption>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
