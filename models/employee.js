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
        get age() {
            // let year = new Date().getFullYear();
            return new Date().getFullYear() - this.dateOfBirth.split("-")[0];
        }
    }
    Employee.init(
        {
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: `First name is required`,
                    },
                    notEmpty: {
                        msg: `First name cannot be empty`,
                    },
                },
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: `Last name is required`,
                    },
                    notEmpty: {
                        msg: `Last name cannot be empty`,
                    },
                },
            },
            dateOfBirth: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: `Date of birth is required`,
                    },
                    notEmpty: {
                        msg: `Date of birth cannot be empty`,
                    },
                },
            },
            education: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: `Education is required`,
                    },
                    notEmpty: {
                        msg: `Education cannot be empty`,
                    },
                },
            },
            position: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: `First Name is required`,
                    },
                    notEmpty: {
                        msg: `First Name cannot be empty`,
                    },
                },
            },
            StoreId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Stores",
                    key: "id",
                },
                validate: {
                    notNull: {
                        msg: `Store ID is required`,
                    },
                    // notEmpty: {
                    //     msg: `Salary cannot be empty`,
                    // },
                },
            },
            salary: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: `Salary is required`,
                    },
                    // notEmpty: {
                    //     msg: `Salary cannot be empty`,
                    // },
                },
            },
        },
        {
            sequelize,
            modelName: "Employee",
        }
    );
    return Employee;
};
