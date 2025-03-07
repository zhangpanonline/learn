const mysql = require('mysql2')

const connection = mysql.createPool({
    host: 'mysql.sqlpub.com',
    port: 3306,
    user: 'zhangpan',
    password: 'PWeoghCeb5vXIZB1',
    database: 'zhangpan'
})

// connection.connect((err) => {
//   console.log(err, '###')
// })

// connection.execute("desc stu", (err, result) => {
//   console.log(err, result)
// })

// 增
// connection.execute("insert into stu (name, age, gender) values ('张三', 18, '男');", (err, result) => {
//   console.log(err, result)
// })

// 改
// connection.execute("update stu set age = 20 where name = '张三';", (err, result) => {
//   console.log(err, result)
// })

// 删
// connection.execute("delete from stu where name = '张三';", (err, result) => {
//   console.log(err, result)
// })

// 查
connection.execute("select * from stu", (err, result) => {
  console.log(err, result)
})


connection.end()