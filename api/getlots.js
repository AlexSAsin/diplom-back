const Database = require("../engine/database");

fastify.route({
  method: "POST",
  url: __filename.replace(__entry, "").replace(/\\/g, "/").replace(".js", ""),
  handler: async (req, res) => {
    const [lots] = await Database.query(
      `select * from lots
        ORDER BY id`
    );
    console.log(lots)
    return lots
  },
});
