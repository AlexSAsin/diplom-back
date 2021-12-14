const Database = require('../engine/database')

fastify.route({
    method: 'GET',
    url: __filename.replace(__entry, '').replace(/\\/g, '/').replace('.js', ''),
    // schema:,
    handler: async (req, res) => {
        return {result: "hello22"}
    }
})