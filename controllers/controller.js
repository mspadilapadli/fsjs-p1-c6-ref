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
            const option = {
                where,
                order: [["firstName", "asc"]],
            };
            // console.log(option);
            // res.send(option);
            // const data = await Employee.getEmployeeByPosition(option);
            const data = await Employee.findAll();
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
            const paylod = { name, location, category, code: "nunggu Hooks" };
            await Store.create(paylod);
            res.redirect("/");
        } catch (error) {
            res.send(error);
        }
    }
    static async storeDetail(req, res) {
        try {
            let { id } = req.params;
            let { delData } = req.query;
            // console.log(delData);

            let data = await Store.findByPk(id, {
                include: {
                    model: Employee,
                },
                order: [[Employee, "firstName", "ASC"]],
            });
            // let employeeFee = data.Employees.
            let totalFee = await Store.employeeFee(data);
            // console.log(totalFee, "cont");
            // res.send(data);
            res.render("detail-store", { data, id, delData, totalFee });
        } catch (error) {
            // console.log(error);
            res.send(error);
        }
    }
    static async getFormEmployee(req, res) {
        try {
            // console.log(req.params, "<<<addempl");
            let { storeId } = req.params;
            let { error } = req.query;
            res.render("form-add-employee", { storeId, error });
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
            res.send(error);
        }
    }
    static async employeeDelete(req, res) {
        try {
        } catch (error) {
            res.send(error);
        }
    }
}

module.exports = Controller;
