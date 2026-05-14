import React from 'react';
import { Metadata } from 'next';
import { AboutClientView } from './AboutClientView';

export const metadata: Metadata = {
  title: 'Our Story | Yet Galore',
  description: 'The origin, aesthetic values, and craftsmanship philosophy behind Yet Galore.',
};

export default function AboutPage() {
  return <AboutClientView />;
}
