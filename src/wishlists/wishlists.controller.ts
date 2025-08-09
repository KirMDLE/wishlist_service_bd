import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateWishlistUseCase } from './application/usecases/create-wishlist.usecase';
import { User } from 'src/users/entities/user.entity';
import { JwtAccessTokenGuard } from 'src/guards/jwt-access-token.guard';
import { AuthUser } from 'src/shared/decorators/auth-user.decorator';
import { CreateWishlistDto } from './dto/create-wishlist.dto';

@Controller('wishlists')
export class WishlistsController {
    constructor(
        private readonly createWishlistUseCase: CreateWishlistUseCase){}
    
    @Post()
    @UseGuards(JwtAccessTokenGuard)
    
    async create(
        @AuthUser() user: User,
        @Body() dto: CreateWishlistDto) {
            return await this.createWishlistUseCase.execute(user.id, dto);
            
        }
    }
