import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null

        const admin = await prisma.adminUser.findUnique({
          where: { email: parsed.data.email }
        })
        if (!admin) return null

        const valid = await bcrypt.compare(parsed.data.password, admin.passwordHash)
        if (!valid) return null

        return { id: admin.id, email: admin.email, name: admin.name }
      }
    })
  ],
  pages: { signIn: '/admin/login' },
  session: { strategy: 'jwt', maxAge: 8 * 60 * 60 },  // 8 hours
})
