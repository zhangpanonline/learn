import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { IdCard } from "./entity/IdCard"

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: "db1118",
    entities: [User, IdCard],
    synchronize: true,
    logging: true,
    // migrations: [],
    // subscribers: [],
})
