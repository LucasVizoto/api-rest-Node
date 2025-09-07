import { it, expect, test, beforeAll, afterAll, describe } from 'vitest'
import request from 'supertest'
import { app } from '../app.js'

describe('Transactions Routes', () => {

    beforeAll(async () =>{
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
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
})