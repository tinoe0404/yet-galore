"use client";

import { useEffect } from 'react';

export default function SetVh() {
  useEffect(() => {
    const setVh = () => {
      // Set --vh to the innerHeight in pixels to work around mobile Safari's dynamic UI
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);

    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
    };
  }, []);

  return null;
}
