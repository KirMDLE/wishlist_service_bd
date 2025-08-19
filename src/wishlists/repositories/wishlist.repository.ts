import { Injectable } from "@nestjs/common";
import { Wishlist } from "../entities/wishlist.entity";
import { DataSource, Repository } from "typeorm";
import { CreateWishlistDto } from "../dto/create-wishlist.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateWishlistDto } from "../dto/update-wishlist.dto";

@Injectable()
export class WishlistRepository   {
    constructor(
      @InjectRepository(Wishlist)
      private readonly repo: Repository<Wishlist>,
      )   {}
        
      

    async createWishlist(createDto: CreateWishlistDto, ownerId: string): Promise<Wishlist> {
        const wishlist = this.repo.create({


          ...createDto,
          owner: { id: ownerId } 
        });
        return this.repo.save(wishlist);
      }


      async findById(id: string): Promise<Wishlist | null> {
        return this.repo.findOne({ where: { id } });
      }
    
      async findAllByUser(userId: string, skip = 0, take = 10): Promise<Wishlist[]> {
        return this.repo.find({
          where: { owner: { id: userId } },
          skip,
          take,
          order: { createdAt: 'DESC' },
        });
      }
    
      async updateWishlist(id: string, dto: UpdateWishlistDto): Promise<void> {
        await this.repo.update(id, dto);
      }
    
      async deleteWishlist(id: string): Promise<void> {
        await this.repo.delete(id);
      }
      
    }
    