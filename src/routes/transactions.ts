import type { FastifyInstance } from "fastify"
import { z } from "zod"
import {randomUUID} from "node:crypto"
import { knex_conn } from "../database.js"
import { error } from "node:console"
import { checkSessionIdExists } from "../middlewares/check-session-id-exists.js"

export async function transactionRoutes(app: FastifyInstance){
    app.addHook('preHandler', async (request, reply) => {
        console.log(`[${request.method}] ${request.url}`)
    })
    //gerando um log de todas as requisições
    
    app.get('/', {
      preHandler:[checkSessionIdExists],

    } , async (request, reply) => {

        const { sessionId } = request.cookies

        const transactions = await knex_conn('transactions')
        .where('sessionId', sessionId)
        .select('*')
    
        return {
            transactions,
        }
    })

    app.get('/:id', {
      preHandler:[checkSessionIdExists],

    } , async (request, reply) => {
        const getTransactionParamsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = getTransactionParamsSchema.parse(request.params)
        const { sessionId } = request.cookies

        const transaction = await knex_conn('transactions')
        .where({
            id: id,
            sessionId: sessionId
        })
        .first()

        return {
            transaction,
        }
    })

    app.get('/summary', {
      preHandler:[checkSessionIdExists],

    } , async (request, reply) => {
        
        const { sessionId } = request.cookies
        
        const summary = await knex_conn('transactions')
        .sum('amount', {as: 'amount'})
        .where('sessionId', sessionId)
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
            //sessionId: z.string()
        })
        const {title, amount, type} = createTransactionBodySchema.parse(request.body)
        //nesse trecho é bem parecido com os **kwargs do python


        let { sessionId } = request.cookies

        if(!sessionId){
            sessionId = randomUUID()  

            reply.setCookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7, //7 days
            })
        }

        await knex_conn('transactions').insert({
            id: randomUUID(),
            title,
            amount: type === 'credit' ? amount : amount * -1,
            sessionId: sessionId,
        })

        //201 created

        return reply.status(201).send()

    })
}