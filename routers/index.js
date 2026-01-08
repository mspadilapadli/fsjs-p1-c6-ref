const router = require("express").Router();
const Controller = require("../controllers/controller");

router.get("/", Controller.readStores);
router.get("/stores", Controller.readStores);
router.get("/employees", Controller.readEmployees);
router.get("/stores/add", Controller.getFormStore);
router.post("/stores/add", Controller.postAddStore);

router.get("/stores/:storedId/employees/add", Controller.getFormEmployee);
router.post("/stores/:storedId/employees/add", Controller.postAddEmployee);

router.get(
    "/stores/:id/employees/:employeeId/edit",
    Controller.getFormEmployee
);
router.post(
    "/stores/:id/employees/:employeeId/edit",
    Controller.postEditEmployee
);
router.get(
    "/stores/:id/employees/:employeeId/delete",
    Controller.employeeDelete
);

router.get("/stores/:storedId", Controller.storeDetail);

module.exports = router;
