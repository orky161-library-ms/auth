const mysql = require('mysql2');
const amqp = require('amqplib/callback_api');
const {channelConsume} = require("../queues/rabbit/auth");

function createRabbitConnection (){
    amqp.connect(`amqps://Admin1234Admin1234:Admin1234Admin1234@b-087fc639-ddfe-476b-a59e-b646b232d665.mq.us-east-1.amazonaws.com:5671`, async (err, conn) => {
        if (err) {
            console.error("[AMQP]", err.message);
            return setTimeout(createRabbitConnection, 1500 + (Math.random() * 3000));
        }
        conn.on("error", (err) => {
            if (err.message !== "Connection closing") {
                console.error("[AMQP] conn error", err.message);
            }
        });
        conn.on("close", () => {
            console.error("[AMQP] reconnecting");
            return setTimeout(createRabbitConnection, 1500 + (Math.random() * 3000));
        });
        console.log("[AMQP] connected");
        await channelConsume(conn)
    });
}


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true
});

// const pool = mysql.createPool({
//     uri:"mysql://my_user:some_password_123@mysql:3306/the_database"
// });

const promisePool = pool.promise();
module.exports = {
    pool: promisePool,
    createRabbitConnection
}
