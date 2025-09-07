import fastify from "fastify"
import cookie from '@fastify/cookie'

import { transactionRoutes } from "./routes/transactions.js"

export const app = fastify()

app.register(cookie)
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

