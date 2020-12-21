const {publish} = require("./index")

function producerClient({email, name, client}) {
    publish("", process.env.CREATE_CLIENT_QUEUE, Buffer.from(JSON.stringify({email, name, client})))
}
function producerEmployee({email, name}) {
    publish("", process.env.CREATE_EMPLOYEE_QUEUE, Buffer.from(JSON.stringify({name})))
}
function producerAuthor({email, name}) {
    publish("", process.env.CREATE_AUTHOR_QUEUE, Buffer.from(JSON.stringify({name})))
}

module.exports = {
    producerClient,
    producerEmployee,
    producerAuthor,
}
