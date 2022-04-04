const Database = require('../engine/database')

fastify.route({
    method: 'POST',
    url: __filename.replace(__entry, '').replace(/\\/g, '/').replace('.js', ''),
    schema: {
        description: 'Get Aviables API',
        body: {
          type: 'object',
          properties: {
            user_id: { type: ['integer'] },
          },
          required: ['user_id']
        }
      },
    handler: async (req, res) => {
        console.info(req.url)
        let {user_id} = req.body
        const [result] = await Database.query(
        ` SELECT url
          FROM role_to_apilist as rta
          INNER JOIN apilist AS api ON api.id = rta.api_id
          INNER JOIN users_to_role AS utr ON utr.role_id = rta.role_id
          INNER JOIN users as u ON u.id = utr.users_id
          WHERE u.id = ${user_id}`)
        return result
    }
})