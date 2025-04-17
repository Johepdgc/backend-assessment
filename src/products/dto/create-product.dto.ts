import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'The name of the product', example: 'Laptop' })
  name: string;

  @ApiProperty({
    description: 'A brief description of the product',
    example: 'A high-performance laptop',
  })
  description: string;

  @ApiProperty({ description: 'The price of the product', example: 999.99 })
  price: number;
}
