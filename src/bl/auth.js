const jwt = require ('jsonwebtoken');
const crypto = require("crypto")
const authDal = new (require('../dal/auth'))()

const Roles = {
    ADMIN: "ADMIN",
    CLIENT: "CLIENT"
}

class authLogic{
    addAdminAuth({email, password, employeeId}) {
        return authDal.addAuth({email, role: Roles.ADMIN, employeeId, password: this.hashPassword(password)})
    }
    addClientAuth({email, password, clientId}) {
        return authDal.addAuth({email, role: Roles.CLIENT, clientId, password: this.hashPassword(password)})
    }

    async checkAuth({email, password }) {
        try {
            const auth = await authDal.getAuth(email)
            if (auth.password === this.hashPassword(password)) {
                const res = await this.generateToken(auth)
                return res
            }
            throw Error()
        }
        catch (e){
            return "email and password do not match"
        }
    }
    verifyToken(t) {
        const token = t.replace('Barrer ', '');
        return  new Promise((resolve, reject) => {
            jwt.verify(token, "process.env.TOKEN_PRIVATE_KEY", (err, decoded) => {
                if (err) {
                    reject(Error);
                }
                resolve(decoded)
            })

        })
    }

    generateToken (user) {
        return new Promise((resolve) => {
            jwt.sign({ id: user.id, email: user.email, role: user.role }, "process.env.TOKEN_PRIVATE_KEY", { algorithm: 'HS256' }, function (
                err,
                token
            ) {
                resolve(token);
            });
        });
    };

    hashPassword (pass){
        return crypto.createHash('sha256').update(pass).digest('hex');
    }
}

module.exports = authLogic
