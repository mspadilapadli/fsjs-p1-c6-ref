"use strict";

/** @type {import('sequelize-cli').Migration} */
const fs = require("fs");
module.exports = {
    async up(queryInterface, Sequelize) {
        const data = JSON.parse(
            fs.readFileSync("./data/stores.json", "utf-8")
        ).map((e) => {
            e.createdAt = e.updatedAt = new Date();
            return e;
        });
        await queryInterface.bulkInsert("Stores", data, {});
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('Stores', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Stores", null, {});
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
