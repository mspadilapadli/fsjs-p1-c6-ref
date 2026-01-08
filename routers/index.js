const router = require("express").Router();
const { Employee, Store } = require("../models");

router.get("/", (req, res) => {
    res.send(test);
});

module.exports = router;
