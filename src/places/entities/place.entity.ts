import { Hotel } from 'src/hotels/entities/hotel.entity';
import { Tour } from 'src/tours/entities/tour.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'places' })
export class Place {
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

  @Column({ type: 'varchar', length: 255, nullable: true })
  country: string;

  @ManyToMany(() => Hotel, (hotel) => hotel.places)
  hotels: Hotel[];

  @OneToMany(() => Tour, (tour) => tour.place)
  tours: Tour[];
}
