import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
  } from 'typeorm';
  
  @Entity({ name: 'reservations' })
  export class Reservation {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @Column({ type: 'int', default: 0 })
    adults: number;
  
    @Column({ type: 'int', default: 0 })
    kids: number;
  
    @Column({ type: 'date', nullable: true })
    startDate: string;
  
    @Column({ type: 'date', nullable: true })
    endDate: string;
  
    @Column({ type: 'int', default: 0 })
    days: number;
  
    @Column({ type: 'int', default: 0 })
    feeAdults: number;
  
    @Column({ type: 'int', default: 0 })
    feeKids: number;
  
    @Column({ type: 'jsonb', nullable: true })
    relocation: any;
  
    @Column({ type: 'jsonb', nullable: true })
    tours: any;
  
    @Column({ type: 'varchar', length: 50, default: 'pending' })
    status: string;
  }
  