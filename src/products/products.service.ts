import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  private idCounter = 1;

  create(createProductDto: CreateProductDto) {
    // This method should create a new product and return it
    const newProduct: Product = {
      id: this.idCounter++,
      ...createProductDto,
      createdAt: new Date(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  findAll(): Product[] {
    // This method should return all products
    return this.products;
  }

  findOne(id: number): Product {
    // This method should return a product by its ID
    // If the product is not found, it should throw an error
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto): Product {
    // This method should update a product by its ID and return the updated product
    // If the product is not found, it should throw an error
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex === -1) {
      throw new Error(`Product with id ${id} not found`);
    }
    // Merge the existing product with the updated data
    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updateProductDto,
    };
    return this.products[productIndex];
  }

  remove(id: number): boolean {
    // This method should remove a product by its ID and return true if successful
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex === -1) return false;

    this.products.splice(productIndex, 1);
    return true;
  }
}
