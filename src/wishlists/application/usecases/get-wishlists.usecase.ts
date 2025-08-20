import { Injectable, NotFoundException } from '@nestjs/common';
import { WishlistsService } from '../../wishlists.service';
import { PaginationQueryDto } from 'src/shared/decorators/dto/pagination-query.dto';
import { Wishlist } from '../../entities/wishlist.entity';

@Injectable()
export class GetWishlistsUseCase {
  constructor(private readonly wishlistsService: WishlistsService) {}

  async execute(userId: string, pagination: PaginationQueryDto): Promise<Wishlist[]> {
    return this.wishlistsService.findAllByUser(userId, pagination);
  }

  async executeById(userId: string, wishlistId: string): Promise<Wishlist> {
    const wishlist = await this.wishlistsService.findOne(userId, wishlistId);
    if (!wishlist) throw new NotFoundException('Wishlist not found');
    return wishlist;
  }
}
