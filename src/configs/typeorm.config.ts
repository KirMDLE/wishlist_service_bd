import { config } from 'dotenv';
config();

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',          
  host: process.env.DB_HOST || 'localhost',
  port:  5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_NAME || 'wishlist',
  autoLoadEntities: true,      
  synchronize: true,          
});