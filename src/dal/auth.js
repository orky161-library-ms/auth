const {pool} = require('../config/index')

const {getAuthByEmailQuery, addAuthQuery} = require("../query_builder/queries")

class authDal {

    async addAuth({email, password, role, employeeId, clientId}) {
        const auth = await pool.query(addAuthQuery, [email, password, role, employeeId, clientId])
        return auth[0].insertId
    }

    async getAuthByEmail(email) {
        const auth = await pool.query(getAuthByEmailQuery, [email])
        return auth[0][0]
    }
}

module.exports = authDal
