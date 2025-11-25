import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from './User'

@Entity()
export class IdCard {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    birthday: Date;

    @Column()
    email: string;

    @OneToOne(() => User, user => user.card) // 建立与User实体间的一对一关系
    @JoinColumn() // 维护一个外键，会自动生成外键的id
    user: User;
}