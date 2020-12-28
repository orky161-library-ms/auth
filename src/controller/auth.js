const crypto = require("crypto")
const AuthDal = require('../dal/auth')
const {producerClient, producerEmployee, producerAuthor,} = require("../queues/rabbit/publish")
const {libraryAuth} = require("../config/index")
const {LibraryRoles} = require("library.io-libs/dist/roles")

async function addAdminAuth({email, password, name}) {
    const employee = await AuthDal.addAuth({email, role: LibraryRoles.ADMIN, password: hashPassword(password)})
    producerEmployee({name, employee, email})
    return employee
}

async function addClientAuth({email, password, name}) {
    const client = await AuthDal.addAuth({email, role: LibraryRoles.CLIENT, password: hashPassword(password)})
    producerClient({email, name, client})
    return client
}

async function addAuthorAuth({email, password, name}) {
    const author = await AuthDal.addAuth({email, role: LibraryRoles.AUTHOR, password: hashPassword(password)})
    producerAuthor({email, author, name})
    return author
}

async function checkAuth({email, password}) {
    try {
        const auth = await AuthDal.getAuthByEmail(email)
        if (auth.password === hashPassword(password)) {
            return libraryAuth.generateToken(auth)
        }
        throw Error()
    } catch (e) {
        return "email and password do not match"
    }
}

function hashPassword(pass) {
    return crypto.createHash('sha256').update(pass).digest('hex');
}

module.exports = {
    addAdminAuth,
    addClientAuth,
    checkAuth,
    addAuthorAuth
}
