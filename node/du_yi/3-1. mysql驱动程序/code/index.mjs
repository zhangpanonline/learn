import mysql from 'mysql2/promise'
console.log('===============================================================')
console.log('===============================================================')
console.log('===============================================================')
// const connection = await mysql.createConnection({
//     host: 'mysql.sqlpub.com',
//     port: 3306,
//     user: 'zhangpan',
//     password: 'PWeoghCeb5vXIZB1',
//     database: 'zhangpan'
// })

// 使用createPool创建连接池，可以复用连接，提高性能，但连接池中的连接数量有限制，默认为10，可以通过max参数设置，如max: 20，表示连接池中最多有20个连接，如果连接数超过这个限制，则会等待直到有连接可用，或者报错，如果连接池中的连接数已经达到最大限制，那么可以使用createConnection创建新的连接，但这样会降低性能，因为每次创建新的连接都需要进行连接的初始化和认证等操作。
const connection = await mysql.createPool({
    host: 'mysql.sqlpub.com',
    port: 3306,
    user: 'zhangpan',
    password: 'PWeoghCeb5vXIZB1',
    database: 'zhangpan',
    waitForConnections: true, // 当连接池中没有可用连接时，是否等待直到有连接可用，默认为false，表示直接报错
    queueLimit: 0, // 当连接池中没有可用连接时，等待队列的最大长度，默认为0，表示不限制等待队列的长度
})

// const res = await connection.connect()
// console.log(res.config) // { serverVersion: '8.0.26', connectionId: 3, protocol41: true, ... }

// let res = await connection.execute("insert into stu (name, age, gender) values ('张三', 18, '男');")
// console.log(res)
const sql = `select * from stu where name = ?;`
// 使用execute而不是query,因为execute可以防止sql注入
const res = await connection.execute(sql, ['张三'])
console.log(res[0])

connection.end()
