import { Injectable } from "@nestjs/common";
import { Wishlist } from "../entities/wishlist.entity";
import { DataSource, Repository } from "typeorm";
import { CreateWishlistDto } from "../dto/create-wishlist.dto";

@Injectable()
export class WishlistRepository extends Repository<Wishlist> {
    constructor(private dataSource: DataSource) {
        super(Wishlist, dataSource.createEntityManager());
    }

    async createWishlist(createDto: CreateWishlistDto, ownerId: string): Promise<Wishlist> {
        const wishlist = this.create({
          ...createDto,
          owner: { id: ownerId } 
        });
        return this.save(wishlist);
      }
    }
    