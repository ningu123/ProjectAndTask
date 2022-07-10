var express = require('express');
var router = express.Router();
var signUpService = require('../service/signup_service')

const validation = require('../service/middleware_service')




router.post("/add", validation.loginFieldValidator(),
    (req, res) => {
        signUpService.addUser(req, res)
    })






// router.post('/logout', (req, res) => {
//     await loginService.logOutUserService(req, res)
// }, "logout")



module.exports = router;
