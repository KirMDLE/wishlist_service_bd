import { Injectable } from '@nestjs/common';
import { WishlistsService } from '../../wishlists.service';
import { UpdateWishlistDto } from '../../dto/update-wishlist.dto';
import { Wishlist } from '../../entities/wishlist.entity';

@Injectable()
export class UpdateWishlistUseCase {
  constructor(private readonly wishlistsService: WishlistsService) {}

  async execute(userId: string, wishlistId: string, dto: UpdateWishlistDto): Promise<Wishlist> {
    return this.wishlistsService.update(userId, wishlistId, dto);
  }
}
