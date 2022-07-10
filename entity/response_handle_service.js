const config = require('../config/appConfig.json');
const cr = require('../entity/common_response');




const handleCommonResponse = async (successCb, response) => {
    try {
        return await successCb(({ data }) =>
            response.set("Connection", "close").status(200).json(data)
        );
    } catch (error) {
        console.log(error);
        var r = cr.responseCb(
            cr.headerCb({ code: !code ? config.response_code.error : code })
        );
        return r;
    }
};

const fieldValidationResponse = (res, errors) => {
    res
        .set("Connection", "close")
        .status(200)
        .send({
            header: {
                code: config.response_code.field_validation,
            },
            error: errors.array(),
        });
};

module.exports= {
    handleCommonResponse, fieldValidationResponse
}