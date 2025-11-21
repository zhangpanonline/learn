import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { IdCard } from "./entity/IdCard"
import { Employee } from "./entity/Employee"
import { Company } from "./entity/Company"
import { Order } from "./entity/Order"
import { Product } from "./entity/Product"

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: "db1118",
    entities: [User, IdCard, Employee, Company, Order, Product],
    synchronize: true,
    logging: true,
    // migrations: [],
    // subscribers: [],
})
