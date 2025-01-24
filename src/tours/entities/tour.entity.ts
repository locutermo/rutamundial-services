import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
  } from 'typeorm';
  
  @Entity({ name: 'tours' })
  export class Tour {
    @PrimaryGeneratedColumn()
    id: number;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @Column({ type: 'varchar', length: 255 })
    name: string;
  
    @Column({ type: 'float', nullable: true })
    kidPrice: number;
  
    @Column({ type: 'float', nullable: true })
    adultPrice: number;
  }
  