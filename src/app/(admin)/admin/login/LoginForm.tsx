'use client';
import { useActionState, useState } from 'react';
import { loginAction } from '@/features/auth/actions';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Eye, EyeOff } from 'lucide-react';

export function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(loginAction, undefined);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="space-y-6">
      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm font-sans">
          {errorMessage}
        </div>
      )}

      <Input 
        label="Email Address" 
        name="email" 
        type="email" 
        required 
      />

      <div className="relative">
        <Input 
          label="Password" 
          name="password" 
          type={showPassword ? 'text' : 'password'} 
          required 
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-[38px] text-muted hover:text-black transition-colors"
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      <Button type="submit" variant="primary" className="w-full py-3" disabled={isPending}>
        {isPending ? 'Authenticating...' : 'Sign In'}
      </Button>
    </form>
  );
}
