var express = require('express');
var router = express.Router();
var logoutServie = require('../service/logout_service')






router.put("/logout", (req, res) => {
    logoutServie.getlogout(req, res)
})






module.exports = router;
