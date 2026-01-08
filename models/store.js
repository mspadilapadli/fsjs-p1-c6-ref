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
        }
    );
    return Store;
};
