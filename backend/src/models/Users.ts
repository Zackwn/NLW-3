import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Orphanage from "./Orphanages";

export enum UserRole {
    ADMIN = "admin",
    USER = "user"
}

@Entity('users')
export default class Users {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name!: string

    @Column()
    email!: string

    @Column()
    password!: string

    @OneToMany(() => Orphanage, (orphanage) => orphanage.user)
    orphanages: Orphanage[]

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole
}