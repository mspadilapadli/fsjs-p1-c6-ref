"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Store extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Store.hasMany(models.Employee, { foreignKey: "StoreId" });
        }
        static async employeeFee(data) {
            try {
                // console.log(data.Employees.salary, "model");
                let totalFee = 0;
                data.Employees.map((item) => (totalFee += item.salary));

                // console.log(totalFee);
                return helper.formatCurrency(totalFee);
            } catch (error) {
                throw error;
            }
        }
    }
    Store.init(
        {
            name: DataTypes.STRING,
            code: DataTypes.STRING,
            location: DataTypes.STRING,
            category: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Store",
            hooks: {
                beforeCreate(instance, option) {
                    // let code1 = "";
                    // if (instance.category === "Mart") {
                    //     code1 = "001";
                    // } else if (instance.category === "Midi") {
                    //     code1 = "002";
                    // } else if (instance.category === "Express") {
                    //     code1 = "003";
                    // }
                    let time = new Date(
                        instance.dataValues.createdAt
                    ).getTime();
                    let code =
                        instance.category === "Mart"
                            ? "001"
                            : instance.category === "Midi"
                            ? "002"
                            : "003";

                    instance.code = `${code} - ${time}`;
                },
            },
        }
    );
    return Store;
};
