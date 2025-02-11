import { Offer } from 'src/offers/entities/offer.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
  } from 'typeorm';
  
  @Entity({ name: 'tour' })
  export class Tour {
    @PrimaryGeneratedColumn({name:'id_tour'})
    id: number;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      nullable: false,
    })
    public created_at: Date;
  
    @Column({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
    })
    public updated_at: Date;

    //Relación: Un Tour puede tener muchas ofertas
    @OneToMany(()=>Offer, (offer) => offer.tour)
    offers: Offer[];
  
}
  