import { expect, test, beforeAll, afterAll, describe, it, beforeEach } from 'vitest'
import { execSync } from 'node:child_process'
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

    beforeEach(() => {
        execSync('npm run knex migrate:rollback --all')
        execSync('npm run knex migrate:latest')
    })

    // it ou test é só questão de semantica, mas fazem a mesma coisa
    it('should be able to create a new transaction', async () => {
        const response = await request(app.server)
            .post('/transactions')
            .send({
                title: 'New Transaction',
                amount: 5000,
                type: 'credit'
            })
            .expect(201)
    })

    // testes não devem depender de outros, no caso da listagem precisa ser criado uma transaction, então deve-se criar dentro desse teste
    it('should be able to list all transactions', async () => {
        const createTransactionResponse = await request(app.server)
            .post('/transactions')
            .send({
                title: 'New Transaction',
                amount: 5000,
                type: 'credit'
            })
            .expect(201)

        const cookies = createTransactionResponse.get('Set-Cookie')

        const listTransactionsResponse = await request(app.server)
            .get('/transactions')
            .set('Cookie', cookies)
            .expect(200)

        expect(listTransactionsResponse.body.transactions).toEqual([
            expect.objectContaining({
                title: 'New Transaction',
                amount: 5000
            })
        ])
    })
})