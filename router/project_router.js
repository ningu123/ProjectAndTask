var express = require('express');
var router = express.Router();
var projectServie = require('../service/project_service')

const validation = require('../service/middleware_service')




router.post("/addProject", validation.projectValidation(),
    (req, res) => {
        projectServie.addProject(req, res)
    })

router.put("/UpdateProjectName", validation.projectValidation(),
    (req, res) => {
        projectServie.updateProject(req, res)
    })

router.get("/getProjects", (req, res) => {
    projectServie.getProject(req, res)
})






module.exports = router;
