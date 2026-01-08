"use strict";

/** @type {import('sequelize-cli').Migration} */
const fs = require("fs");
module.exports = {
    async up(queryInterface, Sequelize) {
        const data = await JSON.parse(
            fs.readFileSync("./data/employees.json", "utf-8")
        ).map((e) => {
            e.createdAt = e.updatedAt = new Date();
            return e;
        });
        await queryInterface.bulkInsert("Employees", data, {});

        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Employees", null, {});
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
