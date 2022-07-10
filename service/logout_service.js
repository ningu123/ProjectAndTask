
var logoutRepo = require('../repo/logout_repo')
var cr_handle = require('../entity/response_handle_service')
var cr = require('../entity/common_response');
var config = require('../config/appConfig.json')
const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken')











function decode(token) {
    console.log(token, "aaaaa");
    return jwt.decode(token).userDetail;
}

function getlogout(req, res) {
    return cr_handle.handleCommonResponse(async (successCb) => {
        let token = req.headers.authorization.split(" ")[1]
        var userDetails = decode(token)
        let userId = userDetails.id
        if (userId) {
            let value = await logoutRepo.getlogout()
            if (value && value.rowCount > 0) {
                return successCb({
                    data: cr.responseCb(
                        cr.headerCb({ code: config.response_code.success }),
                        cr.bodyCb({ val: value.rows })
                    ),
                });
            }
            else {
                return successCb({
                    data: cr.responseCb(
                        cr.headerCb({ code: config.response_code.error }),
                        cr.bodyCb({ val: "server error" })
                    ),
                });
            }

        } else {
            return successCb({
                data: cr.responseCb(
                    cr.headerCb({ code: config.response_code.unauthorize }),
                    cr.bodyCb({ val: "sign In" })
                ),
            });
        }

    }, res);

}


module.exports = { getlogout, }
