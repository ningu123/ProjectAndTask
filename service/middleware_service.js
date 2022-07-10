const { body } = require('express-validator');


function loginFieldValidator() {
    return [
        body('username').isLength({ min: 1 }).withMessage("username is mandatory"),
        body('password').isLength({ min: 5 }).withMessage("password should have minimum 5 characters")
    ]
}
function projectValidation() {
    return [
        body('projectid').isLength({ min: 2 }).withMessage("enter project id"),
        body('projectname').isLength({ min: 5 }).withMessage("enter project name"),
    ]
}
function taskValidation() {
    return [
        body('projectid').isLength({ min: 2 }).withMessage("enter project id"),
        body('projectname').isLength({ min: 5 }).withMessage("enter project name"),
        body('taskid').isLength({ min: 2 }).withMessage("enter task id"),
        body('task').isLength({ min: 5 }).withMessage("explain task"),
    ]
}


module.exports = { loginFieldValidator, projectValidation, taskValidation }
