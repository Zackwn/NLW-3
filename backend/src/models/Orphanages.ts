import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm'
import Image from './Images'
import User from './Users'

@Entity('orphanages')
export default class Orphanages {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @Column()
    latitude: number

    @Column()
    longitude: number

    @Column()
    about: string

    @Column()
    instructions: string

    @Column()
    opening_hours: string

    @Column()
    open_on_weekends: boolean

    /*
        Primeiro parâmetro é uma função 
        que devolve o tipo do retorno.

        Segundo parâmetro é uma função 
        que recebe um elemento do tipo
        retornado na função do parâmetro
        anterior e retorna um campo do
        relacionamento inverso.

        Terceiro parâmetro são 
        configuração adicionais
    */
    @OneToMany(() => Image, (image) => image.orphanage, {
        cascade: ['insert', 'update']
    })
    images: Image[]

    @ManyToOne(() => User, (user) => user.orphanages, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'creator_id' }) // default -> userId
    user: User

    @Column()
    creator_id: number

    @Column()
    pending: boolean
}