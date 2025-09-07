import { expect, test } from 'vitest'

test('o úsuário consegue criar uma nova transação', () => {
    // fazer a chamada http para criação de uma nova trasação e validação se o retorno
    // foi bem sucedido

    const responseStatusCode = 201

    expect(responseStatusCode).toEqual(201)
})