const Database = require("../engine/database");

fastify.route({
  method: "POST",
  url: __filename.replace(__entry, "").replace(/\\/g, "/").replace(".js", ""),
  schema: {
    description: "Get Product",
    body: {
      type: "object",
      properties: {
        product_id: { type: ["integer"] },
      },
      required: ["product_id"],
    },
    response: {
      200: {
        id: { type: "number" },
        name: { type: "string" },
        price: { type: "number" },
      },
    },
  },
  handler: async (req, res) => {
    let { product_id } = req.body;
    const [[product]] = await Database.query(
      ` SELECT * FROM products as p     
          WHERE p.id = :product_id`,
      { replacements: { product_id } }
    );
    return product;
  },
});
