
var loginrepo = require('../repo/signin_repo')
var cr_handle = require('../entity/response_handle_service')
var cr = require('../entity/common_response');
var config = require('../config/appConfig.json')
const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken')
















//Generic login service 
function verify(req, res) {
    console.log(req.body.username, "==>userid");
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
        return cr_handle.fieldValidationResponse(res, validationError)
    }
    else {

        return cr_handle.handleCommonResponse(async (successCb) => {
            var credentials = await loginrepo.verifyLogin(req.body)
            console.log("rowCount: ", credentials.rowCount);
            if (credentials && credentials.rowCount > 0) {
                console.log(credentials, "called in if");
                let userDetailTokenObj = { id: credentials.rows[0].userid, username: req.body.username, }
                var tokenDetails = createToken(userDetailTokenObj, "1h", "1d")
                console.log(tokenDetails, ' ==>tokenDetails');
                if (tokenDetails) {

                    let result;
                    console.log(credentials, ' ==>credentials');
                    result = { ...credentials.rows[0], "token": tokenDetails }
                    return successCb({
                        data: cr.responseCb(
                            cr.headerCb({ code: config.response_code.success }),
                            cr.bodyCb({ val: result })
                        ),
                    });
                }
            } else {
                return successCb({
                    data: cr.responseCb(
                        cr.headerCb({ code: config.response_code.unauthorize }),
                        cr.bodyCb({ val: "unauthorize and go to sign up" })
                    )
                });
            }
        }, res);

    }
}



function createToken(userDetail, accessExp, refreshExp) {
    let accessToken = jwt.sign({ userDetail }, config.token_detials.access_key, { expiresIn: accessExp })
    let refreshToken = jwt.sign({ userDetail }, config.token_detials.refresh_key, { expiresIn: refreshExp })
    return { "accessToken": accessToken, "refreshToken": refreshToken };
}


module.exports = { verify, }
