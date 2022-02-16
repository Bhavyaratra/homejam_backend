const {createClass, getClass, deleteClass,updateClass, addStudent, removeStudent} = require('../controllers/class');
const express = require("express");
const { protect } = require("../middleware/ensureAuth");
const router =  express.Router();


router.post("/create",protect,createClass);
router.post("/get",protect,getClass);
router.post("/delete",protect,deleteClass);
router.post("/update",protect,updateClass);

router.post('/addStudent',protect,addStudent);
router.post('/removeStudent',protect,removeStudent);

module.exports = router