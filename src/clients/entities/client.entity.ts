import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
  } from 'typeorm';
  
  @Entity({ name: 'clients' })
  export class Client {
    @PrimaryGeneratedColumn()
    id: number;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @Column({ type: 'varchar', length: 255 })
    name: string;
  
    @Column({ type: 'varchar', length: 50, nullable: true })
    phone: string;
  }
  