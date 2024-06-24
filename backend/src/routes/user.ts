import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>()

const prisma = new PrismaClient({
    // datasourceUrl: env.DATABASE_URL,
}).$extends(withAccelerate())

userRouter.post('/signup', (c) => {
    return c.text('Signup Page')
})

userRouter.post('/signin', (c) => {
    return c.text('Signin Page')
})