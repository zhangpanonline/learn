import { Entity,Column,PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Company } from './Company'

@Entity()
export class Employee {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @JoinColumn()
    @ManyToOne(() => Company, company => company.employees)
    company: Company

}