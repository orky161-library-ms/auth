const jwt = require('jsonwebtoken');
const crypto = require("crypto")
const AuthDal = require('../dal/auth')
const {producerClient, producerEmployee, producerAuthor,} = require("../queues/rabbit/publish")

const Roles = {
    ADMIN: "ADMIN",
    CLIENT: "CLIENT",
    AUTHOR: "AUTHOR"
}
async function addAdminAuth({email, password, name}) {
    const employee = await AuthDal.addAuth({email, role: Roles.ADMIN, password: hashPassword(password)})
    producerEmployee({name, employee, email})
    return employee
}

async function addClientAuth({email, password, name}) {
    const client = await AuthDal.addAuth({email, role: Roles.CLIENT, password: hashPassword(password)})
    producerClient({email, name, client})
    return client
}

async function addAuthorAuth({email, password, name}) {
    const author = await AuthDal.addAuth({email, role: Roles.AUTHOR, password: hashPassword(password)})
    producerAuthor({email, author, name})
    return author
}

async function checkAuth({email, password}) {
    try {
        const auth = await AuthDal.getAuthByEmail(email)
        if (auth.password === hashPassword(password)) {
            return generateToken(auth)
        }
        throw Error()
    } catch (e) {
        return "email and password do not match"
    }
}

function verifyToken(t) {
    return new Promise((resolve, reject) => {
        if (!/^Barrer /.test(t))
            return reject("Should Barrer the token")
        const token = t.replace('Barrer ', '');
        jwt.verify(token, process.env.TOKEN_PRIVATE_KEY, (err, decoded) => {
            if (err) {
                reject(Error);
            }
            resolve(decoded)
        })

    })
}

function generateToken({id, email, role}) {
    return new Promise((resolve) => {
        jwt.sign({id, email, role}, process.env.TOKEN_PRIVATE_KEY, {algorithm: 'HS256'},
            (err, token) => {
                resolve(token);
            });
    });
};

function hashPassword(pass) {
    return crypto.createHash('sha256').update(pass).digest('hex');
}

module.exports = {
    addAdminAuth,
    addClientAuth,
    checkAuth,
    verifyToken,
    addAuthorAuth
}
