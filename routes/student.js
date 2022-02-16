const { getClass } = require("../controllers/student");
const express = require("express");
const { protect } = require("../middleware/ensureAuth");
const router =  express.Router();


router.post("/classes",protect,getClass);


module.exports = router