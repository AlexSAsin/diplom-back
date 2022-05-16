const Database = require("../engine/database");

fastify.route({
  method: "POST",
  url: __filename.replace(__entry, "").replace(/\\/g, "/").replace(".js", ""),
  handler: async (req, res) => {
    let { product_id } = req.body;
    const [product] = await Database.query(
      ` SELECT * FROM products as p     
          WHERE p.id = '${product_id}'`
    );
    return product;
  },
});
