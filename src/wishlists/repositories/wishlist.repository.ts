import { Injectable } from "@nestjs/common";
import { Wishlist } from "../entities/wishlist.entity";
import { DataSource, Repository } from "typeorm";
import { CreateWishlistDto } from "../dto/create-wishlist.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class WishlistRepository   {
    constructor(
      @InjectRepository(Wishlist)
      private readonly rep: Repository<Wishlist>,
      )   {}
        
      

    async createWishlist(createDto: CreateWishlistDto, ownerId: string): Promise<Wishlist> {
        const wishlist = this.rep.create({


          ...createDto,
          owner: { id: ownerId } 
        });
        return this.rep.save(wishlist);
      }
    }
    