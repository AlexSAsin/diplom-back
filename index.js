// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const cors = require('fastify-cors')
const loader = require ('fastify-loader')
fastify.register(loader, {
  paths: ['./api/**/*.js'],
  inject: {__entry: __dirname, __env: process.env}
}) 
fastify.register(cors, {
  origin: "*",
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["token"],
  credentials: true,
});

fastify.listen(3002,'localhost',async(err )=> {
  if (err)
    console.log('error')
})

