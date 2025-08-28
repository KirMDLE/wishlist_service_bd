import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { Wishlist } from '../wishlists/entities/wishlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Wishlist])],
  providers: [ItemsService],
  controllers: [ItemsController]
})
export class ItemsModule {}