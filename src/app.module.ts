import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { CreateWishlistUseCase } from './wishlists/application/usecases/create-wishlist.usecase';
import { WishlistsService } from './wishlists/wishlists.service';
import { WishlistRepository } from './wishlists/repositories/wishlist.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './configs/typeorm.config';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: TypeOrmConfig }),
    UsersModule, AuthModule, EventEmitterModule.forRoot(), WishlistsModule],
  controllers: [AppController],
  providers: [
    WishlistsService,
    CreateWishlistUseCase,
    WishlistRepository,
  ],
})
export class AppModule {}
