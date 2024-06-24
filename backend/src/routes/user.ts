import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>()

const prisma = new PrismaClient({
    // datasourceUrl: env.DATABASE_URL,
}).$extends(withAccelerate())

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const {email, password, name}= await c.req.json()

    try{
        const user = await prisma.user.create({
            data:{
                email: email,
                password: password,
                name: name
            }
        })

        const jwt = await sign({id:user.id},c.env.JWT_SECRET)
        return c.json({jwt})
    }catch(e){
        c.status(403)
        return c.json({msg: "Some error in signup"})
    }
})

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const user = await prisma.user.findUnique({
        where:{
           email: body.email
        }
    })

    if(!user){
        c.status(403)
        return c.json({msg:"user does not exist/ not found"})

    }
    const jwt = await sign({id:user.id}, c.env.JWT_SECRET)
    return c.json({jwt})

})