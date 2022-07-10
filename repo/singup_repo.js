
const Pool = require('../repo/db_connection');
const dbQuery = require('../repo/db_query')


const check = async (body) => {
    console.log("called");

    try {

        console.log(body, "[][][][");
        let result = await Pool.query(dbQuery.check, [body.username])
        return result


    } catch (error) {
        console.log(error.message)
        return error
    }

}



const addUser = async (body) => {
    console.log("called");

    try {

        console.log(body, "[][][][");
        let result = await Pool.query(dbQuery.adduser, [body.username, body.password,"LOGIN",body.projectId,body.projectname,body.taskId, body.task])
        console.log(result.rows, "aaaa");
        return result


    } catch (error) {
        console.log(error.message)
        return error
    }

}



module.exports = { addUser,check }
