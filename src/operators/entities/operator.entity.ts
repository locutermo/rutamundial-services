import { Offer } from "src/offers/entities/offer.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'operator'})
export class Operator {
    @PrimaryGeneratedColumn({name:'id_operator'})
    id:number;

    @Column({ type: 'varchar', length: 255 })
    name:string;

    @Column({name:'description', type: 'text', nullable: true})
    description?:string;

    //Relación: Un operador puede tener muchas ofertas
    @OneToMany(()=>Offer, (offer) => offer.operator)
    offers: Offer[];
}
