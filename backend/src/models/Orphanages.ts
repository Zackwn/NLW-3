import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'
import Image from './Images'

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
    // nome da coluna que armazena o relacionamento 
    @JoinColumn({ name: 'orphanage_id' })
    images: Image[]
}