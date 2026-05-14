import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        const user = await prisma.adminUser.findUnique({ 
          where: { email: credentials.email as string } 
        });
        
        if (!user) return null;
        
        const passwordsMatch = await bcrypt.compare(credentials.password as string, user.passwordHash);
        
        if (passwordsMatch) {
          return { id: user.id, email: user.email, name: user.name };
        }
        
        return null;
      }
    })
  ]
});
