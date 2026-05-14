import React from 'react';
import { LoginForm } from './LoginForm';
import { Logo } from '@/components/ui/Logo';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream px-6">
      <div className="w-full max-w-md bg-white p-8 md:p-12 shadow-sm space-y-8">
        <div className="text-center">
          <Logo />
          <p className="mt-4 font-sans text-sm tracking-widest text-muted uppercase">Admin Portal</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
