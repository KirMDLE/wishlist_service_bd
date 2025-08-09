import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { CreateWishlistUseCase } from './wishlists/application/usecases/create-wishlist.usecase';
import { WishlistsService } from './wishlists/wishlists.service';

@Module({
  imports: [UsersModule, AuthModule, WishlistsModule],
  controllers: [AppController],
  providers: [
    WishlistsService,
    CreateWishlistUseCase,
    WishlistRepository,
    WishlistQueryRepository
  ],
})
export class AppModule {}
