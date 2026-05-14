import { Variants, Transition } from 'framer-motion';

// ─────────────────────────────────────────
// SHARED EASE & TRANSITION
// ─────────────────────────────────────────
export const EASE_SMOOTH: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const defaultTransition: Transition = {
  duration: 0.6,
  ease: EASE_SMOOTH,
};

// ─────────────────────────────────────────
// CORE VARIANTS
// ─────────────────────────────────────────

export const fadeUp: Variants = {
  initial: { opacity: 0, y: 32 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -32 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_SMOOTH },
  },
};

export const slideInRight: Variants = {
  initial: { opacity: 0, x: 32 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_SMOOTH },
  },
};

// ─────────────────────────────────────────
// STAGGER CONTAINERS
// ─────────────────────────────────────────

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const staggerFast: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

// ─────────────────────────────────────────
// HERO SECTION (staggered text elements)
// ─────────────────────────────────────────

export const heroContainer: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

export const heroChild: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_SMOOTH },
  },
};

// ─────────────────────────────────────────
// IMAGE HOVER
// ─────────────────────────────────────────

export const scaleImage: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.04,
    transition: { duration: 0.7, ease: EASE_SMOOTH },
  },
};

// ─────────────────────────────────────────
// PAGE TRANSITION
// ─────────────────────────────────────────

export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

// ─────────────────────────────────────────
// MOBILE MENU
// ─────────────────────────────────────────

export const mobileMenuOverlay: Variants = {
  initial: { x: '-100%' },
  animate: {
    x: '0%',
    transition: { duration: 0.5, ease: EASE_SMOOTH },
  },
  exit: {
    x: '-100%',
    transition: { duration: 0.4, ease: EASE_SMOOTH },
  },
};

export const mobileMenuStagger: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
  exit: {},
};

export const mobileMenuItem: Variants = {
  initial: { opacity: 0, x: -16 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: EASE_SMOOTH },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

// ─────────────────────────────────────────
// LIGHTBOX / MODAL
// ─────────────────────────────────────────

export const lightboxBackdrop: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export const lightboxContent: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: EASE_SMOOTH },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

// ─────────────────────────────────────────
// ENQUIRY / CONTACT MODAL
// ─────────────────────────────────────────

export const modalBackdrop: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

// Desktop: scale + fade
export const modalContentDesktop: Variants = {
  initial: { opacity: 0, scale: 0.96 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: EASE_SMOOTH },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.2 },
  },
};

// Mobile: slide up from bottom
export const modalContentMobile: Variants = {
  initial: { opacity: 0, y: '100%' },
  animate: {
    opacity: 1,
    y: '0%',
    transition: { duration: 0.4, ease: EASE_SMOOTH },
  },
  exit: {
    opacity: 0,
    y: '100%',
    transition: { duration: 0.3, ease: EASE_SMOOTH },
  },
};

// ─────────────────────────────────────────
// ADMIN: STATS CARDS (mount stagger, no scroll trigger)
// ─────────────────────────────────────────

export const adminStaggerContainer: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.08 },
  },
};

export const adminCardFadeUp: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_SMOOTH },
  },
};

// Admin modals (e.g. category create)
export const adminModal: Variants = {
  initial: { opacity: 0, scale: 0.96 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, ease: EASE_SMOOTH },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.15 },
  },
};
