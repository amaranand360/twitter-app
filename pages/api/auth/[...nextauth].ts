import bcrypt from "bcrypt"
import NextAuth from "next-auth/next"
import  CredentialsProvider  from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import prisma from "@/libs/prismadb"

export default NextAuth({
    adapter:PrismaAdapter(prisma),
    providers:[
        CredentialsProvider({
            name: 'credentials',
            credentials:{
                email:{lebel:'email',type:'text'},
                password:{lebel:'password',type:'password'},

            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                  throw new Error('Invalid credentials');
                }
        
                const user = await prisma.user.findUnique({
                  where: {
                    email: credentials.email
                  }
                });
        
                if (!user || !user?.hashedPassword) {
                  throw new Error('Invalid credentials');
                }
        
                const isCorrectPassword = await bcrypt.compare(
                  credentials.password,
                  user.hashedPassword
                );
        
                if (!isCorrectPassword) {
                  throw new Error('Invalid credentials');
                } 
        
                return user;
            }
        })
    ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});