"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Employee extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Employee.belongsTo(models.Store, { foreignKey: "StoreId" });
        }

        static async getEmployeeByPosition(where) {
            try {
                const option = {
                    where,
                    order: [["firstName", "asc"]],
                    include: {
                        model: this.sequelize.models.Store,
                        attributes: ["code"],
                    },
                };
                const data = await Employee.findAll(option);
                return data;
            } catch (error) {
                throw error;
            }
        }
    }
    Employee.init(
        {
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            dateOfBirth: DataTypes.DATE,
            education: DataTypes.STRING,
            position: DataTypes.STRING,
            StoreId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Stores",
                    key: "id",
                },
            },
            salary: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Employee",
        }
    );
    return Employee;
};
