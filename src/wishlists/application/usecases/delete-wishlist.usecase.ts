import { Injectable } from '@nestjs/common';
import { WishlistsService } from '../../wishlists.service';
import { Wishlist } from '../../entities/wishlist.entity';

@Injectable()
export class DeleteWishlistUseCase {
  constructor(private readonly wishlistsService: WishlistsService) {}

  async execute(userId: string, wishlistId: string): Promise<Wishlist> {
    const wishlist = await this.wishlistsService.findOne(userId, wishlistId);
    await this.wishlistsService.remove(userId, wishlistId);
    return wishlist;
  }
}
