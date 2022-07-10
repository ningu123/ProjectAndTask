
const Pool = require('../repo/db_connection');
const dbQuery = require('../repo/db_query')



const verifyLogin = async (body) => {
    console.log("called");

    try {
        
            console.log(body, "[][][][");
            let result = await Pool.query(dbQuery.getUserDetail, [body.username, body.password])
            console.log(result.rows, "aaaa");
            return result
        

    } catch (error) {
        console.log(error.message)
        return error
    }

}



module.exports = { verifyLogin, }
