import { Operator } from 'src/operators/entities/operator.entity';
import { Tour } from 'src/tours/entities/tour.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({ name: 'offer' }) // Nombre de tabla en singular
export class Offer {
  @PrimaryGeneratedColumn({ name: 'id_offer' })
  id: number;

  @Column({ type: 'decimal', nullable: true })
  kidPrice: number;

  @Column({ type: 'decimal', nullable: true })
  adultPrice: number;

  // Relación con Tour (cada oferta pertenece a un tour)
  @ManyToOne(() => Tour, (tour) => tour.offers)
  tour: Tour;

  // Relación con Operator (cada oferta la realiza un operador)
  @ManyToOne(() => Operator, (operator) => operator.offers)
  operator: Operator;
}
