import fastify from 'fastify'

const app = fastify()

app.get('/hello', (req, res) => {
  return res.send('TESTE')
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
