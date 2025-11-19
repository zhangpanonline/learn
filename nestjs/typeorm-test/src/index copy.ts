import { AppDataSource } from "./data-source"
import { User } from "./entity/User"

async function bootstrap() {
    await AppDataSource.initialize()
    // const user = new User()
    // user.name = 'zhangsan'
    // user.nickname = '张三'
    // user.age = 25
    // user.phone = '13487899872'
    // user.desc = '默认描述'
    // user.other = 1.0101010101
    /**
     * 使用实体管理器方式
     */
    // // 插入数据
    // await AppDataSource.manager.save(user)
    // // 查询数据
    // const users = await AppDataSource.manager.find(User)
    // console.log('查询用户', users)
    /**
     * 使用存储库方式
     */
    // const userRepository = AppDataSource.getRepository(User)
    // await userRepository.save(user)
    // console.log('新增张三成功！')
    // const userList = await userRepository.find()
    // await userRepository.delete(userList)
    // console.log(await userRepository.find())
    /**
     * 使用 QueryBuilder
     */
    // 
    // const querybuilder = AppDataSource.createQueryBuilder()
    // await querybuilder.insert().into(User).values(user).execute()
    // const userUpdate = await querybuilder.select('u').from(User, 'u').where('u.id = :id', { id: 9 }).getRawOne()
    // userUpdate.name = 'lisi'
    // userUpdate.nickname = '李四'
    // console.log(userUpdate)
    // querybuilder.update(User).set(userUpdate).where('id = :id', { id: 9 }).execute()
    // console.log('更新成功！')
    // await querybuilder.delete().from(User).where('id=:id', {id: 9}).execute()
    // const userList = await querybuilder.select('u1').from(User, 'u1').getRawMany()
    // console.log(userList)

}

bootstrap()
