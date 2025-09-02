import fastify from "fastify"
import { knex_conn } from "./database.js"

const app = fastify()

app.get('/hello', async () => {
  
  const transaction = await knex_conn('transactions').insert({
    id: crypto.randomUUID(),
    title: 'New transaction',
    amount: 5000,
  }).returning('*')

  const select_all = await knex_conn('transactions').select('*')

  
  const select_where = await knex_conn('transactions')
  .where('amount', 1000)
  .select('*')


  return transaction 
})
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Running')
  })
// ES Lint, seguindo uma padronização de projeto em node
