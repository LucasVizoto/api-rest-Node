import fastify from "fastify"
import { knex_conn } from "./database.js"
import { env } from "./env/index.js"
import { transactionRoutes } from "./routes/transactions.js"

const app = fastify()

app.register(transactionRoutes, {
  prefix: 'transactions'
})

// app.get('/hello', async () => {
  
//   const transaction = await knex_conn('transactions').insert({
//     id: crypto.randomUUID(),
//     title: 'New transaction',
//     amount: 5000,
//   }).returning('*')

//  const select_all = await knex_conn('transactions').select('*')



app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running')
  })
// ES Lint, seguindo uma padronização de projeto em node
