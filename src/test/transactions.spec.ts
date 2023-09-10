import { expect, test, beforeAll, afterAll, describe, it } from 'vitest'
import request from 'supertest'
import { app } from '../app'

describe('Transactions routes', () => {
    // executa antes de todos os teste
    beforeAll(async () => {
        // vai iniciar a aplicação e todos os plugins
        await app.ready()
    })

    // executa depois de todos os testes
    afterAll(async () => {
        // vai tirar  aplicação da memoria
        await app.close()
    })


    // it ou test é só questão de semantica, mas fazem a mesma coisa
    it('user can create a new transaction', async () => {
        const response = await request(app.server)
            .post('/transactions')
            .send({
                title: 'New Transaction',
                amount: 5000,
                type: 'credit'
            })
            .expect(201)
    })
})