/**
 * Collection slide data for the cinematic homepage experience.
 *
 * Each object defines one fullscreen section. To add a new collection
 * (e.g. Shoes, Denim), simply append a new entry here — the homepage
 * will render it automatically.
 *
 * `image` is resolved at runtime from the database (category.coverImage
 * or first product image). The `fallbackImage` is used only if the DB
 * returns nothing.
 */

export interface CollectionSlide {
  /** Unique identifier — must match the category slug in the database */
  id: string;
  /** Large display title shown on the fullscreen slide */
  title: string;
  /** Small editorial subtext beneath the title */
  subtitle: string;
  /** Call-to-action button label */
  ctaLabel: string;
  /** Link destination for the CTA */
  ctaHref: string;
  /** Static fallback image if no DB image is available */
  fallbackImage: string;
}

/**
 * The ordered list of collections shown on the homepage.
 * Each section becomes a fullscreen snap-scroll slide.
 */
export const COLLECTIONS: CollectionSlide[] = [
  {
    id: 'bags',
    title: 'BAGS',
    subtitle: 'Crafted for expression',
    ctaLabel: 'Explore Collection',
    ctaHref: '/catalogue/bags',
    fallbackImage: '/images/hero.jpeg',
  },
  {
    id: 'jerseys',
    title: 'JERSEYS',
    subtitle: 'Future street luxury',
    ctaLabel: 'View Pieces',
    ctaHref: '/catalogue/jerseys',
    fallbackImage: '/images/hero.jpeg',
  },
  {
    id: 'frames',
    title: 'FRAMES',
    subtitle: 'Reimagined silhouettes',
    ctaLabel: 'Shop Collection',
    ctaHref: '/catalogue/frames',
    fallbackImage: '/images/hero.jpeg',
  },
  {
    id: 'hats',
    title: 'HATS',
    subtitle: 'Defined by presence',
    ctaLabel: 'Explore Collection',
    ctaHref: '/catalogue/hats',
    fallbackImage: '/images/hero.jpeg',
  },
];
