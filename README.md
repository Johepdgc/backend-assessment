# Backend Assessment Solution

This project is a RESTful API built with NestJS, featuring products management with MySQL database integration and JWT authentication.

## Features

- **Products API**: Complete CRUD operations for products
- **Database Integration**: MySQL with TypeORM
- **Authentication**: JWT-based auth system
- **API Documentation**: Swagger/OpenAPI integration
- **Testing**: Unit and E2E tests with Jest
- **Code Quality**: ESLint and Prettier configuration

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or later)
- npm (v7 or later)
- MySQL (v8.0 recommended)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd backend-assessment

   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. Create a MySQL database:
   ```bash
   CREATE DATABASE your_database;
   ```

## Configuration

1. Create a .env file in the root directory:

   # Database

   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=your_password
   DB_NAME=backend_assessment

   # JWT

   JWT_SECRET=your_secure_secret
   JWT_EXPIRATION=1h

   # App

   PORT=8000

2. Update the database configuration in src/app.module.ts:

   ```bash
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: true, // Set to false in production
   }),
   ```

3. Update the JWT secret in src/auth/constants.ts or use environment variables:

   ```bash
   export const jwtConstants = {
    secret: process.env.JWT_SECRET || 'your_development_secret',
   };
   ```

## Running the App

1. Start the development server:

   ```bash
   npm run start:dev
   ```

2. The API will be available at:

   ```bash
   http://localhost:8000
   ```

3. Access the Swagger documentation at:

   ```bash
   http://localhost:8000/api-docs
   ```

## Auth

1. Register a user (default test users are available):

   - **Username**: younameit,
   - **Password**: younameit,

2. Get a JWT token:

   ```bash
       curl -X POST http://localhost:8000/auth/login -d '{"username":"younameit","password":"younameit"}' -H "Content-Type: application/json"
   ```

3. Use the token in subsequent requests:

   ```bash
       curl -X GET http://localhost:8000/products -H "Authorization: Bearer YOUR_TOKEN"
   ```

## Testing

Running Unit Tests

```bash
npm run test
```

Running E2E Test

```bash
npm run test:e2e
```

Test Coverage

```bash
npm run test:cov
```

## API Endpoints

### Authentication

- POST /auth/login - Authenticate and get a JWT token
- GET /auth/profile - Get current user profile (protected)

### Products

- GET /products - Get all products (protected)
- GET /products/:id - Get a product by ID (protected)
- POST /products - Create a new product (protected)
- PATCH /products/:id - Update a product (protected)
- DELETE /products/:id - Delete a product (protected)

## Project Structure

```bash
src/
├── app.module.ts        # Main application module
├── main.ts              # Application entry point
├── auth/                # Authentication module
├── products/            # Products module
│   ├── dto/             # Data Transfer Objects
│   ├── entities/        # Database entities
│   ├── products.controller.ts
│   ├── products.module.ts
│   └── products.service.ts
└── users/               # Users module
```

## Code Quality

Run linting:

```bash
npm run lint
```

Format code:

```bash
npm run format
```
