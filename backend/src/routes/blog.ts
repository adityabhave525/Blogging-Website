import { Hono } from "hono"


export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>()

blogRouter.post('/', (c) => {
    return c.json({})
})

blogRouter.put('/', (c) => {
    return c.json({})
})

blogRouter.get('/bulk', (c) => {
    return c.json({})
})

blogRouter.get('/:id', (c) => {
    return c.json({})
})