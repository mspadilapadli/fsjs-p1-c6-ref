const { where } = require("sequelize");
const { Store, Employee } = require("../models");
const helper = require("../helper");

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
            const { status } = req.query;
            const { storeId } = req.params;
            const data = await Store.findByPk(storeId, {
                include: Employee,
                order: [[Employee, "firstName", "ASC"]],
            });
            const employees = data.Employees || [];
            const totalFee = Store.employeeFee(data);
            res.render("detail-store", {
                data,
                totalFee,
                hasEmployees: employees.length > 0,
                status,
            });
        } catch (error) {
            res.send(error);
        }
    }
    static async getFormEmployee(req, res) {
        try {
            let { storeId, employeeId } = req.params;
            let dataEmployee = {};
            let action = `/stores/${storeId}/employees/add`;
            let isEdit = false;

            if (employeeId) {
                dataEmployee = await Employee.findOne({
                    where: { id: employeeId, StoreId: storeId },
                });
                action = `/stores/${storeId}/employees/${employeeId}/edit`;
                isEdit = true;
            }
            // res.send(dataEmployee);

            //* experiment, get employee by store
            // const store = await Store.findByPk(storeId, {
            //     include: {
            //         model: Employee,
            //     },
            // });
            // dataEmployee = store.Employees.find(({ id }) => id == employeeId);

            res.render("form-employee", {
                dataEmployee,
                action,
                isEdit,
                errors: {},
            });
        } catch (error) {
            res.send(error);
        }
    }

    static async postAddEmployee(req, res) {
        const { storeId } = req.params;
        try {
            const {
                firstName,
                lastName,
                dateOfBirth,
                education,
                position,
                salary,
            } = req.body;

            const payload = {
                firstName,
                lastName,
                dateOfBirth,
                education,
                position,
                StoreId: storeId,
                salary,
            };
            await Employee.create(payload);
            res.redirect(`/stores/${storeId}?status=added`);
        } catch (error) {
            const errors = helper.formatSequelizeValidationErrors(error);
            if (errors) {
                return res.render("form-employee", {
                    dataEmployee: req.body,
                    action: `/stores/${storeId}/employees/add`,
                    isEdit: false,
                    errors,
                });
            }
            res.send(error);
        }
    }
    static async postEditEmployee(req, res) {
        let { storeId, employeeId } = req.params;
        try {
            const {
                firstName,
                lastName,
                dateOfBirth,
                education,
                position,
                salary,
            } = req.body;

            const payload = {
                firstName,
                lastName,
                dateOfBirth,
                education,
                position,
                StoreId: storeId,
                salary,
            };
            // bulkUpdate with where
            await Employee.update(payload, {
                where: {
                    id: employeeId,
                },
                validate: true,
            });
            res.redirect(`/stores/${storeId}?status=updated`);
        } catch (error) {
            const errors = helper.formatSequelizeValidationErrors(error);
            if (errors) {
                return res.render("form-employee", {
                    dataEmployee: req.body,
                    action: `/stores/${storeId}/employees/${employeeId}/edit`,
                    isEdit: true,
                    errors,
                });
            }
            res.send(error);
        }
    }
    static async employeeDelete(req, res) {
        try {
            let { storeId, employeeId } = req.params;
            const delEmployee = await Employee.findByPk(employeeId);
            if (!delEmployee) throw new Error("Employee not found");
            const employeeName = `${delEmployee.firstName} ${delEmployee.lastName}`;

            await delEmployee.destroy();
            res.redirect(`/stores/${storeId}?status=deleted`);
        } catch (error) {
            res.send(error);
        }
    }
}

module.exports = Controller;
