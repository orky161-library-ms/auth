const {publish} = require("./index")

function producerClient({name}) {
    publish("", process.env.CREATE_AUTHOR_QUEUE, Buffer.from(JSON.stringify({name})))
}
function producerEmployee({name}) {
    publish("", process.env.CREATE_AUTHOR_QUEUE, Buffer.from(JSON.stringify({name})))
}
function producerAuthor({name}) {
    publish("", process.env.CREATE_AUTHOR_QUEUE, Buffer.from(JSON.stringify({name})))
}

module.exports = {
    producerClient,
    producerEmployee,
    producerAuthor,
}
