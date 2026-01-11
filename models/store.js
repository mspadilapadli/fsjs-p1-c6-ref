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

            //* create hooks method 1 via the .init() method
            // hooks: {
            //     beforeCreate: (instance, option) => {
            //         const { category } = instance;
            //         const code =
            //             category == "Mart"
            //                 ? "001"
            //                 : category == "Midi"
            //                 ? "002"
            //                 : "003";
            //         const date = new Date(instance.createdAt).getTime();
            //         instance.code = `${code}-${date}`;
            //     },
            // },
        }
    );
    //* create hooks method 2 via the .addHook() method
    Store.addHook("beforeCreate", (store, option) => {
        const { category } = store;
        const code =
            category == "Mart" ? "001" : category == "Midi" ? "002" : "003";

        const date = new Date(store.createdAt).getTime();
        // createdAt di difined ketika method Store.create dipanggil, memang otomatis akan di createdAt buatkan oleh sequelize secara otomatis ketika instance store, tapi ini tetep Risky, karena banyak faktor nya, bisa jadi timpstamp:false , dll

        store.code = `${code}-${Date.now()}`; // better menggunana Date.now()
    });

    //* create hooks method 3 via the direct method
    // Store.beforeCreate(async (store, opt) => {
    //     const { category } = store;
    //     const code =
    //         category == "Mart" ? "001" : category == "Midi" ? "002" : "003";
    //     const date = new Date(store.createdAt).getTime();
    //     store.code = `${code}-${Date.now()}`;
    // });

    return Store;
};
