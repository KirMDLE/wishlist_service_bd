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


    @UseGuards(JwtAccessTokenGuard)
    @Controller('wishlists')
    @ApiTags('Wishlists')
    export class WishlistsController {
      constructor(
        private readonly wishlistsService: WishlistsService,
        private readonly events: EventEmitter2,
      ) {}
    
      @Post()
      @ApiBody({ type: CreateWishlistDto })
      @ApiOkResponse({ type: SuccessCreateWishlistDto })
      @ApiForbiddenResponse({ description: 'User does not have access' })
      @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
      async create(
        @AuthUser() user: User,
        @Body() body: CreateWishlistDto,
        @Res() res: Response,
      ) {
        const wishlist = await this.wishlistsService.createWishlist(user, body);
        const publicWishlist = plainToClass(PublicWishlist, wishlist);
        const successDto: SuccessCreateWishlistDto = { createWishlist: publicWishlist };
    
        this.events.emit(Events.Wishlist.Create, user, successDto);
    
        return res
          .status(HttpStatus.OK)
          .json({ ...successDto, message: 'Wishlist created successfully' })
          .end();
      }
    
      @Get()
      @ApiOkResponse({ type: SuccessGetWishlistsDto })
      @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
      async findAll(
        @Query() pagination: PaginationQueryDto,
        @Res() res: Response,
        @AuthUser() user: PublicUserData,
      ) {
        const wishlists = await this.wishlistsService.getAllWishlists(user.publicId, pagination);
        const publicWishlists = wishlists.map(wishlist => plainToClass(PublicWishlist, wishlist));
        const successDto: SuccessGetWishlistsDto = { wishlists: publicWishlists };
    
        return res
          .status(HttpStatus.OK)
          .json(successDto)
          .end();
      }
    
      @Get(':id')
      @ApiOkResponse({ type: SuccessGetWishlistsDto })
      @ApiNotFoundResponse({ description: 'Wishlist not found' })
      async findOne(
        @Param('id') wishlistId: string,
        @Res() res: Response,
        @AuthUser() user: PublicUserData,
      ) {
        const wishlist = await this.wishlistsService.getWishlistById(user.publicId, wishlistId);
        const publicWishlist = plainToClass(PublicWishlist, wishlist);
        const successDto: SuccessGetWishlistsDto = { wishlists: [publicWishlist] };
    
        return res
          .status(HttpStatus.OK)
          .json(successDto)
          .end();
      }
    
      @Put(':id')
      @ApiBody({ type: UpdateWishlistDto })
      @ApiOkResponse({ type: SuccessUpdateWishlistDto })
      @ApiForbiddenResponse({ description: 'User is not owner of this wishlist' })
      @ApiNotFoundResponse({ description: 'Wishlist not found' })
      async update(
        @Param('id') wishlistId: string,
        @Body() updateWishlistDto: UpdateWishlistDto,
        @AuthUser() user: User,
        @Res() res: Response,
      ) {
        const updatedWishlist = await this.wishlistsService.updateWishlist(user, wishlistId, updateWishlistDto);
        const successDto: SuccessUpdateWishlistDto = { updateWishlist: plainToClass(PublicWishlist, updatedWishlist) };
    
        this.events.emit(Events.Wishlist.Update, user, successDto);
    
        return res
          .status(HttpStatus.OK)
          .json({ ...successDto, message: 'Wishlist updated successfully' })
          .end();
      }
    
      @Delete(':id')
      @ApiOkResponse({ type: SuccessDeleteWishlistDto })
      @ApiForbiddenResponse({ description: 'User is not owner of this wishlist' })
      @ApiNotFoundResponse({ description: 'Wishlist not found' })
      async remove(
        @Param('id') wishlistId: string,
        @AuthUser() user: User,
        @Res() res: Response,
      ) {
        const deletedWishlist = await this.wishlistsService.deleteWishlist(user, wishlistId);
        const successDto: SuccessDeleteWishlistDto = { deleteWishlist: plainToClass(PublicWishlist, deletedWishlist) };
    
        this.events.emit(Events.Wishlist.Delete, user, successDto);
    
        return res
          .status(HttpStatus.OK)
          .json({ ...successDto, message: 'Wishlist deleted successfully' })
          .end();
      }
    }