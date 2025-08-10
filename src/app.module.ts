import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { CreateWishlistUseCase } from './wishlists/application/usecases/create-wishlist.usecase';
import { WishlistsService } from './wishlists/wishlists.service';
import { WishlistRepository } from './wishlists/repositories/wishlist.repository';

@Module({
  imports: [UsersModule, AuthModule, WishlistsModule],
  controllers: [AppController],
  providers: [
    WishlistsService,
    CreateWishlistUseCase,
    WishlistRepository,
  ],
})
export class AppModule {}
