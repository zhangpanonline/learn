import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm'
import { Order } from './Order'

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => Order, order => order.products)
    @JoinTable({
        name: 'order_map_product',
        joinColumn: {
            name: 'product',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'order',
            referencedColumnName: 'id'
        }
    })
    orders: Order[]
}