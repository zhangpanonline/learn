import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
// 一对一关系
async function bootstrap() {
    await AppDataSource.initialize()
    // const user = new User() 

}

bootstrap()
