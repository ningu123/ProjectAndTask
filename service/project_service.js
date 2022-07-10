
var projectRepo = require('../repo/project_repo')
var cr_handle = require('../entity/response_handle_service')
var cr = require('../entity/common_response');
var config = require('../config/appConfig.json')
const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken')
















function addProject(req, res) {
    console.log(req.headers.authorization.split(".")[1], "==>userid");
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
        return cr_handle.fieldValidationResponse(res, validationError)
    }
    else {

        return cr_handle.handleCommonResponse(async (successCb) => {
            let token = req.headers.authorization.split(" ")[1]
            var userDetails = decode(token)
            let userId = userDetails.id
            if (userId) {
                let check = await projectRepo.checkProjct(userId, req.body)
                if (check && check.rowCount > 0) {
                    return successCb({
                        data: cr.responseCb(
                            cr.headerCb({ code: config.response_code.duplication_exception }),
                            cr.bodyCb({ val: "project already exist" })
                        ),
                    });
                }
                else {
                    let value = await projectRepo.aadProject(userId, userDetails.username, req.body)
                    return successCb({
                        data: cr.responseCb(
                            cr.headerCb({ code: config.response_code.success }),
                            cr.bodyCb({ val: value.rows })
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
}

function updateProject(req, res) {
    console.log(req.headers.authorization.split(".")[1], "==>userid");
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
        return cr_handle.fieldValidationResponse(res, validationError)
    }
    else {

        return cr_handle.handleCommonResponse(async (successCb) => {
            let token = req.headers.authorization.split(" ")[1]
            var userDetails = decode(token)
            let userId = userDetails.id
            if (userId) {
                let check = await projectRepo.checkProjct(userId, req.body)
                if (check && check.rowCount > 0) {
                    return successCb({
                        data: cr.responseCb(
                            cr.headerCb({ code: config.response_code.duplication_exception }),
                            cr.bodyCb({ val: "project already exist" })
                        ),
                    });
                } else {
                    let value1 = await projectRepo.updateProject(userId, req.body)
                    return successCb({
                        data: cr.responseCb(
                            cr.headerCb({ code: config.response_code.success }),
                            cr.bodyCb({ val: value1.rows })
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
}


function decode(token) {
    console.log(token, "aaaaa");
    return jwt.decode(token).userDetail;
}

function getProject(req, res) {
    return cr_handle.handleCommonResponse(async (successCb) => {
        let token = req.headers.authorization.split(" ")[1]
        var userDetails = decode(token)
        let userId = userDetails.id
        if (userId) {

            let value = await projectRepo.getProject(userId)
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
                        cr.headerCb({ code: config.response_code.not_found }),
                        cr.bodyCb({ val: "no data found" })
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


module.exports = { addProject, getProject, updateProject }
