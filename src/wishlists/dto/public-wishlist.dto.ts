import { Wishlist } from '../entities/wishlist.entity';

export class PublicWishlist {
  id: string;
  title: string;
  description?: string;

  static fromEntity(entity: Wishlist): PublicWishlist {
    const dto = new PublicWishlist();
    dto.id = entity.id;
    dto.title = entity.title;
    dto.description = entity.description;
    return dto;
  }
}
