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
            if (!this.dateOfBirth) return null;

            const today = new Date();
            const birth = new Date(this.dateOfBirth);

            const birthdayThisYear =
                today >=
                new Date(
                    today.getFullYear(),
                    birth.getMonth(),
                    birth.getDate()
                );

            const age =
                today.getFullYear() -
                birth.getFullYear() -
                (birthdayThisYear ? 0 : 1);
            return age;
        }

        get formateDateyyymmdd() {
            return new Date(this.dateOfBirth).toISOString().split("T")[0];
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
                    //*validate minWorkingAge with getter age
                    minWorkingAge() {
                        if (this.age < 17) {
                            throw new Error(`Minimum age is 17 years old`);
                        }
                    },

                    //*validate minWorkingAge without getter age
                    // minWorkingAge(value) {
                    //     const today = new Date();
                    //     const birth = new Date(value);
                    //     const minAge = 17;

                    //     const minimalDate = new Date(
                    //         today.getFullYear() - minAge,
                    //         today.getMonth(),
                    //         today.getDate()
                    //     );
                    //     if (birth > minimalDate) {
                    //         throw new Error(
                    //             `Minimal harus berusia 17 tahun untuk dapat bekerja`
                    //         );
                    //     }
                    // },
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
                        msg: `Position is required`,
                    },
                    notEmpty: {
                        msg: `Position cannot be empty`,
                    },
                    defaultPositionForS2S3(value) {
                        const allowPositions = ["Manager", "CEO"];

                        if (
                            ["S2", "S3"].includes(this.education) &&
                            !allowPositions.includes(value)
                        ) {
                            throw new Error(
                                `Jenjang pendidikan S2 atau S3 hanya boleh menepati posisi Manager atau CEO`
                            );
                        }
                    },
                },
            },
            StoreId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Stores",
                    key: "id",
                },
                allowNull: false,
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
                    notEmpty: {
                        msg: `Salary cannot be empty`,
                    },
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
