const { where } = require("sequelize");
const { Store, Employee } = require("../models");

class Controller {
    static async readStores(req, res) {
        try {
            const data = await Store.findAll();
            res.render("stores", { data });
        } catch (error) {
            res.send(error);
        }
    }
    static async readEmployees(req, res) {
        try {
            const { byPosition } = req.query;
            const where = {};
            if (byPosition) {
                where.position = byPosition;
            }
            const data = await Employee.getEmployeeByPosition(where);
            res.render("employees", { data });
        } catch (error) {
            res.send(error);
        }
    }

    static async getFormStore(req, res) {
        try {
            res.render("form-add-stores");
        } catch (error) {
            res.send(error);
        }
    }
    static async postAddStore(req, res) {
        try {
            const { name, location, category } = req.body;
            const paylod = { name, location, category };
            await Store.create(paylod);
            res.redirect("/");
        } catch (error) {
            res.send(error);
        }
    }
    static async storeDetail(req, res) {
        try {
            const { storeId } = req.params;
            const data = await Store.findByPk(storeId, {
                include: Employee,
            });
            const employees = data.Employees || [];
            res.render("detail-store", {
                data,
                hasEmployees: employees.length > 0,
            });
        } catch (error) {
            console.log(error);
            // res.send(error);
        }
    }
    static async getFormEmployee(req, res) {
        try {
        } catch (error) {
            res.send(error);
        }
    }

    static async postAddEmployee(req, res) {
        try {
        } catch (error) {
            res.send(error);
        }
    }
    static async postEditEmployee(req, res) {
        try {
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
    static async employeeDelete(req, res) {
        try {
            // console.log(req.params);
        } catch (error) {
            res.send(error);
        }
    }
}

module.exports = Controller;
