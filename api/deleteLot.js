const Database = require("../engine/database");

fastify.route({
  method: "POST",
  url: __filename.replace(__entry, "").replace(/\\/g, "/").replace(".js", ""),
  schema: {
    description: "Delete Lot",
    body: {
      type: "object",
      properties: {
        lot_id: { type: ["integer"] },
      },
      required: ["lot_id"],
    },
  },
  handler: async (req, res) => {
    let { lot_id } = req.body;
    try {
      await Database.transaction(async (transaction) => {
        // удаляем лот
        await Database.query(
          `UPDATE lots
            SET withdrawn = NOW()::timestamp
            WHERE id = :lot_id`,
          { replacements: { lot_id }, transaction }
        );

        // получаем айди строения у данного лота и по нему смотрим количество актуальных лотов
        const [[{ building_id }]] = await Database.query(
          `SELECT building_id FROM lots
            WHERE id = :lot_id;`,
          { replacements: { lot_id }, transaction }
        );

        const [[{ lots_count }]] = await Database.query(
          `SELECT COUNT(*) AS "lots_count" FROM lots 
            WHERE withdrawn IS NULL and building_id = :building_id;`,
          { replacements: { building_id }, transaction }
        );

        if (lots_count > 0) {
          res.send("Лот успешно удалён");
        } else {
          // если количество = 0, то удаляем строение
          await Database.query(
            `UPDATE buildings
             SET withdrawn = NOW()::timestamp
             WHERE id = :building_id;`,
            { replacements: { building_id }, transaction }
          );

          // получаем айди проекта у данного строения и по нему смотрим количество актуальных строений
          const [[{ project_id }]] = await Database.query(
            `SELECT project_id FROM buildings
              WHERE id = :building_id;`,
            { replacements: { building_id }, transaction }
          );
          const [[{ buildings_count }]] = await Database.query(
            `SELECT COUNT(*) AS "buildings_count" FROM buildings 
              WHERE withdrawn IS NULL and project_id = :project_id;`,
            { replacements: { project_id }, transaction }
          );

          // если количество = 0, то удаляем проект
          if (buildings_count > 0) {
            res.send("Лот успешно удалён");
          } else {
            await Database.query(
              `UPDATE projects
                 SET withdrawn = NOW()::timestamp
                 WHERE id = :project_id;`,
              { replacements: { project_id }, transaction }
            );
            res.send("Лот успешно удалён");
          }
        }
      });
    } catch (err) {
      return res.send({
        statusCode: 418,
        local: `Ошибка удаления лота`,
      });
    }
  },
});
