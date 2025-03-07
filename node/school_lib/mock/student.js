require('../models/relation')
const Mock = require('mockjs')

const result = Mock.mock({
    'datas|500': [
        {
            "id|+1": 1,
            name: '@cname',
            birthday: '@date',
            'sex|1-2': true,
            mobile: /^1\d{10}/,
            'ClassId|1-16': 1
        }
    ]
}).datas;


const Student = require('../models/Student')
Student.bulkCreate(result)
