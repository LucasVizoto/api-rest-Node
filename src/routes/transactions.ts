import type { FastifyInstance } from "fastify"
import { z } from "zod"
import {randomUUID} from "node:crypto"
import { knex_conn } from "../database.js"

export async function transactionRoutes(app: FastifyInstance){
    app.get('/', async (request, reply) => {
        const transactions = await knex_conn('transactions').select('*')
    
        return {
            transactions,
        }
    })

    app.get('/:id', async (request, reply) => {
        const getTransactionParamsSchema = z.object({
            id: z.string().uuid(),
        })

        const params = getTransactionParamsSchema.parse(request.params)

        const transaction = await knex_conn('transactions')
        .where({id: params.id})
        .first()

        return {
            transaction,
        }
    })

    app.get('/summary', async (request, reply) => {
        const summary = await knex_conn('transactions')
        .sum('amount', {as: 'amount'})
        .first()

        return{
            summary,
        }
    })

    app.post('/', async (request, reply) => {    
        // const { title, amount, type: credit or debit } = request.body
        
        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit']),
        })
        const {title, amount, type} = createTransactionBodySchema.parse(request.body)
        //nesse trecho é bem parecido com os **kwargs do python


        let sessionId = request.cookies.sessionId

        if(!sessionId){
            sessionId = randomUUID()  

            reply.cookie('sessionId', sessionId, {
                path: '/',
            })
        }

        await knex_conn('transactions').insert({
            id: randomUUID(),
            title,
            amount: type === 'credit' ? amount : amount * -1,
            //sessionId: sessionId,
        })

        //201 created

        return reply.status(201).send()

    })
}