import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import { IdCard } from "./entity/IdCard"
// 一对一关系
async function bootstrap() {
    await AppDataSource.initialize()
    const user = new User() 
    user.name = 'zhangsan'
    user.nickname = '张三'
    user.age = 25
    user.other = 1.
    user.phone = '13468933465'
    user.desc = '张三的信息'

    const idCard = new IdCard()
    idCard.name = 'my name is zhangsan'
    idCard.address = '陕西省咸阳市'
    idCard.birthday = new Date()
    idCard.email = 'zhangsan@gmail.com'

    // 关联两个实体
    idCard.user = user
    
    // 获取实体的存储库
    const userRepository = AppDataSource.getRepository(User)
    const idCardRepository = AppDataSource.getRepository(IdCard)

    // 首先保存用户
    // await userRepository.save(user)

    // await idCardRepository.save(idCard)

    // 查询，只能通过idcard查user
    // const idCardRes = await idCardRepository.find({
    //     relations: {
    //         user: true
    //     }
    // })

    // console.log(idCardRes)

    // 修改实体类建立双向关联后，可以通过User实体访问IdCard实体
    const userRes = await userRepository.findOne({
        where: {
            id: 1
        },
        relations: {
            card: true
        }
    })
    console.log(userRes)
    userRes.name = '李四'
    userRes.card.name = 'my name is li si'

    await userRepository.save(userRes)

}

bootstrap()
