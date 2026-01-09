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
            // console.log(req.params);
            // console.log(req.body);
            let { storeId } = req.params;
            // console.log(storeId, "<<<post");
            let {
                firstName,
                lastName,
                education,
                dateOfBirth,
                position,
                salary,
            } = req.body;
            // res.render("form-add-employee");
            let addData = {
                firstName,
                lastName,
                dateOfBirth,
                education,
                position,
                StoreId: storeId,
                salary,
            };
            // console.log(addData);
            await Employee.create(addData);
            res.redirect(`/stores/${storeId}`);
        } catch (error) {
            let { storeId } = req.params;
            if (error.name === "SequelizeValidationError") {
                let errors = error.errors.map((el) => {
                    return el.message;
                });
                // res.send(errors);
                res.redirect(
                    `/stores/${storeId}/employees/add?error=${errors}`
                );
            } else {
                res.send(error);
            }
        }
    }
    static async postEditEmployee(req, res) {
        try {
            // console.log(req.params, "<<<addempl");
            console.log(req.body);
            let { storeId, employeeId } = req.params;
            let {
                firstName,
                lastName,
                education,
                dateOfBirth,
                position,
                salary,
            } = req.body;
            // res.render("form-add-employee");
            let updateData = {
                firstName,
                lastName,
                dateOfBirth,
                education,
                position,
                StoreId: storeId,
                salary,
            };
            await Employee.update(updateData, {
                where: {
                    id: employeeId,
                },
            });
            res.redirect(`/stores/${storeId}`);
            // let updateData = await Employee.findByPk(employeeId);
            // res.render("edit-employee", { storeId, updateData, employeeId });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
    static async employeeDelete(req, res) {
        try {
            // console.log(req.params);
            let { storeId, employeeId } = req.params;
            let delData = await Employee.findByPk(employeeId);
            await Employee.destroy({
                where: {
                    id: employeeId,
                },
            });
            res.redirect(
                `/stores/${storeId}?delData=${delData.firstName} ${delData.lastName}`
            );
        } catch (error) {
            res.send(error);
        }
    }
}

module.exports = Controller;
