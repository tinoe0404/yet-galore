'use client';

import React from 'react';
import { SnapScrollContainer } from './SnapScrollContainer';
import type { CollectionSlideData } from './SnapScrollContainer';

interface CinematicHomepageProps {
  heroHeadline: string;
  heroSubheadline: string;
  heroImage: string;
  collections: CollectionSlideData[];
}

/**
 * Client-side wrapper for the cinematic homepage experience.
 *
 * This component receives the resolved collection data (with DB images)
 * from the server component and renders the fullscreen snap-scroll
 * storytelling layout.
 */
export function CinematicHomepage({ heroHeadline, heroSubheadline, heroImage, collections }: CinematicHomepageProps) {
  return (
    <SnapScrollContainer 
      heroHeadline={heroHeadline}
      heroSubheadline={heroSubheadline}
      heroImage={heroImage}
      collections={collections} 
    />
  );
}
