import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Orphanage from "./Orphanages";

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
}