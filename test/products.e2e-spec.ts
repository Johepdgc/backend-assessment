import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('ProductsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/products (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/products')
      .send({
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
      })
      .expect(201);

    expect(response.body).toMatchObject({
      id: expect.any(Number) as number,
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      createdAt: expect.any(String) as string,
    });
  });

  it('/products (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/products')
      .expect(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
