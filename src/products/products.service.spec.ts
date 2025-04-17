import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

describe('ProductsService', () => {
  let service: ProductsService;

  const mockProduct = {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    price: 100,
    createdAt: new Date(),
  };

  const mockRepository = {
    create: jest.fn().mockReturnValue(mockProduct), // Properly mock the create method
    save: jest.fn().mockResolvedValue(mockProduct),
    find: jest.fn().mockResolvedValue([mockProduct]),
    findOne: jest.fn().mockResolvedValue(mockProduct),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    service = module.get<ProductsService>(ProductsService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const createProductDto = {
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
    };
    const result = await service.create(createProductDto);
    expect(mockRepository.create).toHaveBeenCalledWith(createProductDto);
    expect(mockRepository.save).toHaveBeenCalledWith(mockProduct);
    expect(result).toEqual(mockProduct);
  });

  it('should return all products', async () => {
    const result = await service.findAll();
    expect(mockRepository.find).toHaveBeenCalled();
    expect(result).toEqual([mockProduct]);
  });

  it('should return a product by ID', async () => {
    const result = await service.findOne(1);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(mockProduct);
  });

  it('should delete a product by ID', async () => {
    const result = await service.remove(1);
    expect(mockRepository.delete).toHaveBeenCalledWith(1);
    expect(result).toBe(true);
  });
});
