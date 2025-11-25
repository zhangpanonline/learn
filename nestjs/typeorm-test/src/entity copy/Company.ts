import { Employee } from './Employee'

import { Entity,Column,PrimaryGeneratedColumn,OneToMany } from 'typeorm'

@Entity()
export class Company {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Employee, employee => employee.company, {
        cascade: true
    })
    employees: Employee[]
}