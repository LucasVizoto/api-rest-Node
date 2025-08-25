import fastify from "fastify"
import { knex_conn } from "./database.js"

const app = fastify()

app.get('/hello', async () => {
  const tables = knex_conn('sqlite_schema').select('*')

  return tables
})
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Running')
  })
// ES Lint, seguindo uma padronização de projeto em node
