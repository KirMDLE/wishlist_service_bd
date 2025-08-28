import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { User } from '../users/entities/user.entity';
import { PaginationQueryDto } from 'src/shared/decorators/dto/pagination-query.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) {}




  async createWishlist(user: User, dto: CreateWishlistDto): Promise<Wishlist> {
    const wishlist = this.wishlistRepository.create({
      ...dto,
      owner: user , 
    });
    return this.wishlistRepository.save(wishlist);
  }

  async findAllByUser(
    userId: string,
    pagination: PaginationQueryDto,
  ): Promise<Wishlist[]> {
    const { skip, take } = pagination;
    return this.wishlistRepository.find({
      where: { owner: { id: userId } },
      skip,
      take,
    });
  }

  



  async findOne(userId: string, wishlistId: string): Promise<Wishlist> {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id: wishlistId, owner: { id: userId } },
    });

    if (!wishlist) {
      throw new NotFoundException('Wishlist not found or access denied');
    }
    return wishlist;



  }
  // async update(
  //   userId: string,
  //   wishlistId: string,
  //   dto: UpdateWishlistDto,
  // ): Promise<Wishlist> {
  //   await this.findOne(userId, wishlistId); 
  //   await this.wishlistRepository.update(wishlistId, dto);
  //   return this.findOne(userId, wishlistId);
  // }
//   async remove(userId: string, wishlistId: string): Promise<void> {
//     await this.findOne(userId, wishlistId); 
//     await this.wishlistRepository.delete(wishlistId);
//   }
// }
}