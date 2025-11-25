import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm'
import { Product } from './Product'

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => Product, product => product.orders, {
        cascade: true
    })
    products: Product[]
}