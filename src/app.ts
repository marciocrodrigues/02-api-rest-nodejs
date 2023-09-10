import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { transactionsRoutes } from './routes/transactions'

export const app = fastify()

app.register(cookie)

// nesse exmplo o hook está no contexto de todas as rotas que estiverem registrar após esse hook
app.addHook('preHandler', async (request, response) => {
    console.log(`[${request.method}] ${request.url}`)
})

app.register(transactionsRoutes, {
    prefix: 'transactions'
})