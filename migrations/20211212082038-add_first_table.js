"use strict";

module.exports = {
  up: 
  async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try{
      await  queryInterface.createTable(
        "test_table",
        {
          name: Sequelize.STRING,
          isBetaMember: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false,
          },
        },
        { transaction }
      );
      await transaction.commit()
    }
    catch (error){
        console.log('error')
        await transaction.rollback()
        throw error
    }

  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("test_table");
  },
};
