import { FastifyReply, FastifyRequest } from "fastify"

export async function checkSessionIdExists(request: FastifyRequest, response: FastifyReply) {
    const ssesionId = request.cookies.sessionId

    if (!ssesionId) {
        return response.status(401).send({
            error: 'Unauthorized'
        })
    }
}