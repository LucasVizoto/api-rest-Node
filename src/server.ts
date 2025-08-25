import fastify = require('fastify')

const app = fastify()

app.get('/hello', () => {
  return 'Hello World'
})
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Running')
  })
// ES Lint, seguindo uma padronização de projeto em node
