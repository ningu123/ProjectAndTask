
const Pool = require('../repo/db_connection');
const dbQuery = require('../repo/db_query')

const checkProjct = async (id, body) => {
console.log(id,body,"ppppppppppp");
    try {
        return await Pool.query(dbQuery.checkProject, [id, body.projectname,body.projectid])
    } catch (error) {
        console.log(error.message)
        return error
    }

}

const aadProject = async (id, username, body) => {
    try {

        return await Pool.query(dbQuery.addProject, [id, username, "LOGIN", body.projectname,body.projectid])

    } catch (error) {
        console.log(error.message)
        return error
    }

}
const updateProject = async (id, body) => {
    try {

        return await Pool.query(dbQuery.updateProject, [id, body.projectname, body.projectid])

    } catch (error) {
        console.log(error.message)
        return error
    }

}
const getProject = async (id) => {
    try {

        return await Pool.query(dbQuery.getProject, [id])

    } catch (error) {
        console.log(error.message)
        return error
    }

}



module.exports = { aadProject, updateProject,checkProjct, getProject }
