import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, OneToOne } from "typeorm"
import { IdCard } from "./IdCard"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100,
    })
    name: string

    @Column()
    age: number

    @Column({
        length: 100
    })
    nickname: string

    @Column()
    phone: string

    @Column("text")
    desc: string

    @Column('float')
    other: number

    @OneToOne(() => IdCard, card => card.user, {
        cascade: true // 级联
    })
    card: IdCard

}
