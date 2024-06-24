import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/user/signup', (c) => {
  return c.text('Signup')
})

app.post('/api/v1/user/signin', (c) => {
  return c.text('Signin')
})

app.post('/api/v1/blog', (c) => {
  return c.text('Blog')
})

app.put('/api/v1/blog', (c) => {
  return c.text('Blog')
})

app.get('/api/v1/blog/:id', (c) => {
  const id = c.req.param('id')
  console.log(id);  
  return c.text('Get blog with id')
})

app.get('/api/v1/blog/bulk', (c) => {
  return c.text('Get all blogs')
})



export default app
