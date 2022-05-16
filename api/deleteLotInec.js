const Database = require("../engine/database");

fastify.route({
  method: "POST",
  url: __filename.replace(__entry, "").replace(/\\/g, "/").replace(".js", ""),
  handler: async (req, res) => {
    let { lot_id } = req.body;
    try {
      await Database.query(
        `UPDATE lots
            SET withdrawn = NOW()::timestamp
            WHERE id = :lot_id`,
        { replacements: { lot_id } }
      );
      res.send("Лот успешно удалён");
    } catch (err) {
      return res.send({
        statusCode: 418,
        local: `Ошибка удаления лота`,
      });
    }
  },
});
