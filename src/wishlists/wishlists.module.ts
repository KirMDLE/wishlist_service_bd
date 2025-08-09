import { Module } from '@nestjs/common';
import { WishlistsController } from './wishlists.controller';
import { WishlistsService } from './wishlists.service';
import { WishlistItem } from './entities/wishlist-item.entity';
import { Wishlist } from './entities/wishlist.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateWishlistUseCase } from './application/usecases/create-wishlist.usecase';
import { WishlistRepository } from './repositories/wishlist.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wishlist, WishlistItem]),
    UsersModule 
  ],
  controllers: [WishlistsController],
  providers: [WishlistsService,CreateWishlistUseCase,WishlistRepository]
})
export class WishlistsModule {}
