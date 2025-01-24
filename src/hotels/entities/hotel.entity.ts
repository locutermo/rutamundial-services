import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
  } from 'typeorm';
  
  @Entity({ name: 'hotels' })
  export class Hotel {
    @PrimaryGeneratedColumn()
    id: number;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @Column({ type: 'varchar', length: 255 })
    name: string;
  
    @Column({ type: 'int', default: 0 })
    stars: number;
  }
  