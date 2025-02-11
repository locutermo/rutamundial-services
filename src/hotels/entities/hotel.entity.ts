import { Offer } from 'src/offers/entities/offer.entity';
import { Place } from 'src/places/entities/place.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'hotels' })
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int', default: 0 })
  stars: number;

  // Relación Many-to-Many: Un Hotel puede estar en varios lugares / destinos
  @ManyToMany(() => Place, (place) => place.hotels)
  @JoinTable({
    name: 'hotel_place',
    joinColumn: {
      name: 'hotel_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'place_id',
      referencedColumnName: 'id',
    },
  })
  places: Place[];
}
