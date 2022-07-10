var express = require('express');
var router = express.Router();
var taskServie = require('../service/task_service')

const validation = require('../service/middleware_service')




router.post("/addtask", validation.taskValidation(),
    (req, res) => {
        taskServie.addtask(req, res)
    })

router.put("/Updatetask", validation.taskValidation(),
    (req, res) => {
        taskServie.updatetask(req, res)
    })

router.get("/gettask", (req, res) => {
    taskServie.gettask(req, res)
})






module.exports = router;
