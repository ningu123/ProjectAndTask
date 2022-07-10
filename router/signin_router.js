var express = require('express');
var router = express.Router();
var loginService = require('../service/signin_service')

const validation = require('../service/middleware_service')




router.post("/verify", validation.loginFieldValidator(),
    (req, res) => {
        loginService.verify(req, res)
    })






// router.post('/logout', (req, res) => {
//     await loginService.logOutUserService(req, res)
// }, "logout")



module.exports = router;
