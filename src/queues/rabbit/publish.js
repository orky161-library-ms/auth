const {publish} = require("./index")

function producerClient({email, name, client}) {
    publish("", process.env.CREATE_CLIENT_QUEUE, Buffer.from(JSON.stringify({email, name, client})))
}
function producerEmployee({email, name, employee}) {
    publish("", process.env.CREATE_EMPLOYEE_QUEUE, Buffer.from(JSON.stringify({email, name, employee})))
}
function producerAuthor({email, name, author}) {
    publish("", process.env.CREATE_AUTHOR_QUEUE, Buffer.from(JSON.stringify({email, name, author})))
}

module.exports = {
    producerClient,
    producerEmployee,
    producerAuthor,
}
