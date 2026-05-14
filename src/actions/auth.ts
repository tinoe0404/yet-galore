'use server';

import { signIn } from '@/features/auth/config';
import { AuthError } from 'next-auth';

// Simple in-memory rate limiting map
// In production with edge/serverless, a KV store like Redis is recommended.
const rateLimitStore = new Map<string, { count: number, resetAt: number }>();

export async function loginAction(prevState: string | undefined, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  if (!email || !password) {
    return 'Email and password are required.';
  }

  // Rate Limiting Logic (In-Memory Fallback)
  const ip = 'admin-login'; // Tracked globally since it's a single admin system
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 5;

  const rateLimit = rateLimitStore.get(ip);
  if (rateLimit) {
    if (now > rateLimit.resetAt) {
      rateLimitStore.set(ip, { count: 1, resetAt: now + windowMs });
    } else {
      if (rateLimit.count >= maxAttempts) {
        return 'Too many login attempts. Please try again later.';
      }
      rateLimitStore.set(ip, { count: rateLimit.count + 1, resetAt: rateLimit.resetAt });
    }
  } else {
    rateLimitStore.set(ip, { count: 1, resetAt: now + windowMs });
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/admin/dashboard',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid email or password.';
        default:
          return 'Something went wrong.';
      }
    }
    // Next.js redirect throws an error which must be rethrown
    throw error;
  }
}
