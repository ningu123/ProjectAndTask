
var loginrepo = require('../repo/singup_repo')
var cr_handle = require('../entity/response_handle_service')
var cr = require('../entity/common_response');
var config = require('../config/appConfig.json')
const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken')
















//Generic login service 
function addUser(req, res) {
    console.log(req.body.username, "==>userid");
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
        return cr_handle.fieldValidationResponse(res, validationError)
    }
    else {

        return cr_handle.handleCommonResponse(async (successCb) => {
            var checkUser = await loginrepo.check(req.body)
            if (checkUser && checkUser.rowCount > 0) {
                return successCb({
                    data: cr.responseCb(
                        cr.headerCb({ code: config.response_code.duplication_exception }),
                        cr.bodyCb({ val: "user already exist" })
                    ),
                });
            }
            else {
                var credentials = await loginrepo.addUser(req.body)
                if (credentials && credentials.rowCount > 0) {
                    return successCb({
                        data: cr.responseCb(
                            cr.headerCb({ code: config.response_code.success }),
                            cr.bodyCb({ val: credentials.rows[0] })
                        ),
                    });
                } else {
                    return successCb({
                        data: cr.responseCb(
                            cr.headerCb({ code: config.response_code.error }),
                            cr.bodyCb({ val: "server error" })
                        ),
                    });
                }
            }

        }, res);

    }
}






module.exports = { addUser }
