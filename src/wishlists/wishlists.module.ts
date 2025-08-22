import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistsController } from './wishlists.controller';
import { WishlistsService } from './wishlists.service';
import { Wishlist } from './entities/wishlist.entity';
import { WishlistItem } from './entities/wishlist-item.entity';
import { UsersModule } from 'src/users/users.module';
import { CreateWishlistUseCase } from './application/usecases/create-wishlist.usecase';
import { GetWishlistsUseCase } from './application/usecases/get-wishlists.usecase';
import { UpdateWishlistUseCase } from './application/usecases/update-wishlist.usecase';
import { DeleteWishlistUseCase } from './application/usecases/delete-wishlist.usecase';
import { WishlistRepository } from './repositories/wishlist.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wishlist, WishlistItem]),
    UsersModule,
  ],
  controllers: [WishlistsController],
  providers: [
    WishlistsService,
    WishlistRepository,
    CreateWishlistUseCase,
    GetWishlistsUseCase,
    UpdateWishlistUseCase,
    DeleteWishlistUseCase,
  ],
  exports: [
    WishlistsService,
    WishlistRepository,
    CreateWishlistUseCase,
    GetWishlistsUseCase,
    UpdateWishlistUseCase,
    DeleteWishlistUseCase,
  ],
})
export class WishlistsModule {}
