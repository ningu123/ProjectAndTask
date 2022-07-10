
const Pool = require('../repo/db_connection');
const dbQuery = require('../repo/db_query')



const getlogout = async () => {
    try {

        return await Pool.query(dbQuery.getlogout, ['loggedOut'])

    } catch (error) {
        console.log(error.message)
        return error
    }

}



module.exports = { getlogout }
