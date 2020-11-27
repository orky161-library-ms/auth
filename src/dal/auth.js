const pool = require('../db')

class authDal {

    async addAuth({email, password, role, employeeId, clientId}) {
        const auth = await pool.query('INSERT INTO auths (email, password, role, employeeId, clientId) VALUES (?,?,?,?,?)',
            [email, password, role, employeeId, clientId])
        return auth[0].insertId
    }

    async getAuth(email) {
        const auth = await pool.query('SELECT * FROM auths WHERE email = (?)',
            [email])
        return auth[0][0]
    }
}

module.exports = authDal
