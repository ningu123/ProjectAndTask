
const Pool = require('../repo/db_connection');
const dbQuery = require('../repo/db_query')

const checktask = async (id, body) => {
    try {
        return await Pool.query(dbQuery.checktask, [id, body.projectname,body.projectid, body.task,body.taskid])
    } catch (error) {
        console.log(error.message)
        return error
    }

}

const aadtask = async (id, username, body) => {
    try {

        return await Pool.query(dbQuery.addtask, [id, username, "LOGIN", body.projectname,body.projectid, body.task,body.taskid])

    } catch (error) {
        console.log(error.message)
        return error
    }

}
const updatetask = async (id, body) => {
    try {

        return await Pool.query(dbQuery.updatetask, [id, body.projectname, body.projectid , body.task,body.taskid])

    } catch (error) {
        console.log(error.message)
        return error
    }

}
const gettask = async (id) => {
    try {

        return await Pool.query(dbQuery.gettask, [id])

    } catch (error) {
        console.log(error.message)
        return error
    }

}



module.exports = { aadtask, updatetask,checktask, gettask }
