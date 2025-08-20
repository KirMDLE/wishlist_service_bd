import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateWishlistUseCase } from './application/usecases/create-wishlist.usecase';
import { User } from 'src/users/entities/user.entity';
import { JwtAccessTokenGuard } from 'src/guards/jwt-access-token.guard';
import { AuthUser } from 'src/shared/decorators/auth-user.decorator';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import type { Response } from 'express';
import { ApiBody, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatus, Get, Param, Query, Put, Delete, Res } from '@nestjs/common';
import { ApiNotFoundResponse } from '@nestjs/swagger';
import { WishlistsService } from './wishlists.service';
import { plainToClass } from 'class-transformer';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Events } from 'src/shared/events/events';
import { PaginationQueryDto } from 'src/shared/decorators/dto/pagination-query.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';


    @UseGuards(JwtAccessTokenGuard)
    @Controller('wishlists')
    @ApiTags('Wishlists')
    export class WishlistsController {
      constructor(
        private readonly wishlistsService: WishlistsService,
        private readonly events: EventEmitter2,
        private readonly createWishlistUseCase: CreateWishlistUseCase,
        private readonly getWishlistsUseCase: GetWishlistsUseCase,
        private readonly updateWishlistUseCase: UpdateWishlistUseCase,
        private readonly deleteWishlistUseCase: DeleteWishlistUseCase,
      ) {}
    
      @Post()
      @ApiBody({ type: CreateWishlistDto })
      @ApiOkResponse({ type: CreateWishlistDto })
      @ApiForbiddenResponse({ description: 'User does not have access' })
      @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
      async create(@AuthUser() user: any, @Body() dto: CreateWishlistDto) {
        const wishlist = await this.createWishlistUseCase.execute(user.id, dto);
        const publicWishlist = PublicWishlist.fromEntity(wishlist);
        const successDto: SuccessCreateWishlistDto = { createWishlist: publicWishlist };
        this.events.emit(Events.Wishlist.Create, user, successDto);
        return { ...successDto, message: 'Wishlist created successfully' };
      }
    
      @Get()
      @ApiOkResponse({ type: SuccessGetWishlistsDto })
      @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
      async findAll(@AuthUser() user: any, @Query() pagination: PaginationQueryDto) {
        const wishlists = await this.getWishlistsUseCase.execute(user.id, pagination);
        const publicWishlists = wishlists.map(PublicWishlist.fromEntity);
        const successDto: SuccessGetWishlistsDto = { wishlists: publicWishlists };
        return successDto;
      }
    
      @Get(':id')
      @ApiOkResponse({ type: SuccessGetWishlistsDto })
      @ApiNotFoundResponse({ description: 'Wishlist not found' })
      async findOne(@AuthUser() user: any, @Param('id') wishlistId: string) {
        const wishlist = await this.getWishlistsUseCase.executeById(user.id, wishlistId);
        const publicWishlist = PublicWishlist.fromEntity(wishlist);
        const successDto: SuccessGetWishlistsDto = { wishlists: [publicWishlist] };
        return successDto;
      }
    
    
      @Put(':id')
      @ApiBody({ type: UpdateWishlistDto })
      @ApiOkResponse({ type: SuccessUpdateWishlistDto })
      @ApiForbiddenResponse({ description: 'User is not owner of this wishlist' })
      @ApiNotFoundResponse({ description: 'Wishlist not found' })
      async update(@AuthUser() user: any, @Param('id') wishlistId: string, @Body() dto: UpdateWishlistDto) {
        const updatedWishlist = await this.updateWishlistUseCase.execute(user.id, wishlistId, dto);
        const successDto: SuccessUpdateWishlistDto = { updateWishlist: PublicWishlist.fromEntity(updatedWishlist) };
        this.events.emit(Events.Wishlist.Update, user, successDto);
        return { ...successDto, message: 'Wishlist updated successfully' };
      }
    
      @Delete(':id')
      @ApiOkResponse({ type: SuccessDeleteWishlistDto })
      @ApiForbiddenResponse({ description: 'User is not owner of this wishlist' })
      @ApiNotFoundResponse({ description: 'Wishlist not found' })
      async remove(@AuthUser() user: any, @Param('id') wishlistId: string) {
        const deletedWishlist = await this.deleteWishlistUseCase.execute(user.id, wishlistId);
        const successDto: SuccessDeleteWishlistDto = { deleteWishlist: PublicWishlist.fromEntity(deletedWishlist) };
        this.events.emit(Events.Wishlist.Delete, user, successDto);
        return { ...successDto, message: 'Wishlist deleted successfully' };
      }
    }