import type { FastifyInstance } from "fastify"
import { z } from "zod"
import {randomUUID} from "node:crypto"
import { knex_conn } from "../database.js"

export async function transactionRoutes(app: FastifyInstance){
    app.post('/', async (request, reply) => {    
        // const { title, amount, type: credit or debit } = request.body
        
        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit']),
        })
        const {title, amount, type} = createTransactionBodySchema.parse(request.body)
        //nesse trecho é bem parecido com os **kwargs do python

        await knex_conn('transactions').insert({
            id: randomUUID(),
            title,
            amount: type === 'credit' ? amount : amount * -1
        })

        //201 created

        return reply.status(201).send()

    })
}