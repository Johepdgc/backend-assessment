import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('products') // Table name
export class Product {
  @ApiProperty({
    description: 'The unique identifier of the product',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The name of the product', example: 'Laptop' })
  @Column({ type: 'varchar', length: 255 })
  @Index()
  name: string;

  @ApiProperty({
    description: 'A brief description of the product',
    example: 'A high-performance laptop',
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: 'The price of the product', example: 999.99 })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ApiProperty({
    description: 'The date the product was created',
    example: '2025-04-17T12:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;
}
