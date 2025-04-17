import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProduct = {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    price: 100,
    createdAt: new Date(),
  };

  const mockService = {
    create: jest.fn().mockResolvedValue(mockProduct),
    findAll: jest.fn().mockResolvedValue([mockProduct]),
    findOne: jest.fn().mockResolvedValue(mockProduct),
    update: jest.fn().mockResolvedValue(mockProduct),
    remove: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a product', async () => {
    const createProductDto: CreateProductDto = {
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
    };
    const result = await controller.create(createProductDto);
    expect(service.create).toHaveBeenCalledWith(createProductDto);
    expect(result).toEqual(mockProduct);
  });

  it('should return all products', async () => {
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockProduct]);
  });

  it('should return a product by ID', async () => {
    const result = await controller.findOne('1');
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockProduct);
  });

  it('should update a product', async () => {
    const updateProductDto: UpdateProductDto = {
      name: 'Updated Product',
    };
    const result = await controller.update('1', updateProductDto);
    expect(service.update).toHaveBeenCalledWith(1, updateProductDto);
    expect(result).toEqual(mockProduct);
  });

  it('should delete a product', async () => {
    const result = await controller.remove('1');
    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result).toBe(true);
  });
});
