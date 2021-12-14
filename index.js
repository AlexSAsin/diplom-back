// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const loader = require ('fastify-loader')
fastify.register(loader, {
  paths: ['./api/**/*.js'],
  inject: {__entry: __dirname, __env: process.env}
}) 

fastify.listen(3002,'localhost',async(err )=> {
  if (err)
    console.log('error')
})

