
const checkConnectionQuery = "DO 1"

const getAuthByEmailQuery = 'SELECT * FROM auths WHERE email = (?)'
const addAuthQuery = 'INSERT INTO auths (email, password, role, employeeId, clientId) VALUES (?,?,?,?,?)'


module.exports ={
    checkConnectionQuery,
    addAuthQuery,
    getAuthByEmailQuery
}
