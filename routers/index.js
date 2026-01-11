const router = require("express").Router();
const Controller = require("../controllers/controller");

//read
router.get("/", Controller.readStores);
router.get("/stores", Controller.readStores);
router.get("/employees", Controller.readEmployees);

//add store
router.get("/stores/add", Controller.getFormStore);
router.post("/stores/add", Controller.postAddStore);

//add employee
router.get("/stores/:storeId/employees/add", Controller.getFormEmployee);
router.post("/stores/:storeId/employees/add", Controller.postAddEmployee);

//edit employee
router.get(
    "/stores/:storeId/employees/:employeeId/edit",
    Controller.getFormEmployee
);
router.post(
    "/stores/:storeId/employees/:employeeId/edit",
    Controller.postEditEmployee
);

//delete employee
router.get(
    "/stores/:storeId/employees/:employeeId/delete",
    Controller.employeeDelete
);

//read detail store
router.get("/stores/:storeId", Controller.storeDetail);

module.exports = router;
