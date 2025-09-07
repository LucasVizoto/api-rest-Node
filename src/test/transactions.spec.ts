import { it, expect, test, beforeAll, afterAll, describe, beforeEach } from 'vitest'
import { execSync } from 'node:child_process'
import request from 'supertest'
import { app } from '../app.js'

describe('Transactions Routes', () => {

    beforeAll(async () =>{
        await app.ready()

    })

    afterAll(async () => {
        await app.close()
    })

    beforeEach(()=>{
        execSync('npm run knex migrate:rollback --all')
        execSync('npm run knex migrate:latest')
    })

// usar o it e o test são a mesma coisa, mas o único ponto diferente
// é apenas quando lido em inglÊs, o it fica semanticamente mais agradável
// para leitura, mas ambos funcionam da mesma forma

//deveria ser possível criar uma nova transação
// it should be able ...
    it('should be able to create a new transaction', async () => {
        // fazer a chamada http para criação de uma nova trasação e validação se o retorno
        // foi bem sucedido
        await request(app.server)
        .post('/transactions')
        .send({
            title: 'New transaction',
            amount: 5000,
            type: 'credit'
        })
        .expect(201) //estou validando se meu retorno vai ser um 201
    })
    

    it.skip('should be able to list all transactions', async () => {
        const createTransactionResponse = await request(app.server)
        .post('/transactions')
        .send({
            title: 'New transaction',
            amount: 5000,
            type: 'credit'
        })
        .expect(201) //estou validando se meu retorno vai ser um 201

        const cookies = createTransactionResponse.get('Set-Cookie')

        if (!cookies) {
            throw new Error('No Set-Cookie header returned from createTransactionResponse')
        }

        const listTransactionsResponse = await request(app.server)
        .get('/transactions')
        .set('Cookie', cookies)
        .expect(200) //estou validando se meu retorno vai ser um 200
        
        expect(listTransactionsResponse.body.transactions).toEqual([
            expect.objectContaining({
                title: 'New transaction',
                amount: 5000
            })
        ])
    })

    it.skip('should be able to get a specific transactions', async () => {
        const createTransactionResponse = await request(app.server)
        .post('/transactions')
        .send({
            title: 'New transaction',
            amount: 5000,
            type: 'credit'
        })
        .expect(201) //estou validando se meu retorno vai ser um 201

        const cookies = createTransactionResponse.get('Set-Cookie')

        if (!cookies) {
            throw new Error('No Set-Cookie header returned from createTransactionResponse')
        }

        const listTransactionsResponse = await request(app.server)
        .get('/transactions')
        .set('Cookie', cookies)
        .expect(200) //estou validando se meu retorno vai ser um 200
        
        const transactionId = listTransactionsResponse.body.transactions[0].id
        
        const getTransactionsResponse = await request(app.server)
        .get(`/transactions/${transactionId}`)
        .set('Cookie', cookies)
        .expect(200) //estou validando se meu retorno vai ser um 200
        

        expect(getTransactionsResponse.body.transaction).toEqual(
            expect.objectContaining({
                title: 'New transaction',
                amount: 5000
            })
        )
    })


})