const Database = require("../engine/database");

fastify.route({
  method: "POST",
  url: __filename.replace(__entry, "").replace(/\\/g, "/").replace(".js", ""),
  handler: async (req, res) => {
    try {
      await Database.transaction(async (transaction) => {
        await Database.query(
          `UPDATE lots
          SET withdrawn = null
          WHERE id = 1`,
          { transaction }
        );
        await Database.query(
          `UPDATE buildings
          SET withdrawn = null
          WHERE id = 1`,
          { transaction }
        );
        await Database.query(
          `UPDATE projects
            SET withdrawn = null
            WHERE id = 1`,
          { transaction }
        );
      });
      res.send(true)
    } catch (err) {
      return res.send({
        statusCode: 418,
        local: `Ошибка`,
      });
    }
  },
});
