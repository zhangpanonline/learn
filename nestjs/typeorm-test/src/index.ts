import { AppDataSource } from "./data-source"
import { Order } from "./entity/Order"
import { Product } from "./entity/Product"
// 多对多关系
async function bootstrap() {
    await AppDataSource.initialize()

    const order = new Order()
    order.name = '订单1'
    const product1 = new Product()
    product1.name = '商品1'
    const product2 = new Product()
    product2.name = '商品2'

    order.products = [product1, product2]

    const orderRepository = AppDataSource.getRepository(Order)

    await orderRepository.save(order)
}

bootstrap()
