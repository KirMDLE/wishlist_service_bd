import { PublicWishlist } from './public-wishlist.dto';

export class SuccessCreateWishlistDto {
  createWishlist: PublicWishlist;
}

export class SuccessGetWishlistsDto {
  wishlists: PublicWishlist[];
}

export class SuccessUpdateWishlistDto {
  updateWishlist: PublicWishlist;
}

export class SuccessDeleteWishlistDto {
  deleteWishlist: PublicWishlist;
}
