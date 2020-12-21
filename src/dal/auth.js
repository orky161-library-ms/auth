const {pool} = require('../config/index')
const {getAuthByEmailQuery, addAuthQuery, checkConnectionQuery} = require("../query_builder/queries")


async function addAuth({email, password, role, employeeId, clientId}) {
    const auth = await pool.query(addAuthQuery, [email, password, role])
    return auth[0].insertId
}

async function getAuthByEmail(email) {
    const auth = await pool.query(getAuthByEmailQuery, [email])
    return auth[0][0]
}

function checkConnection() {
    return pool.query(checkConnectionQuery)
}

module.exports = {
    checkConnection,
    addAuth,
    getAuthByEmail
}
