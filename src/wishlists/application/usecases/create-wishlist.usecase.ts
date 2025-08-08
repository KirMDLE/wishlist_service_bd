import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Not } from "typeorm";

@Injectable()
export class CreateWishlistUseCase {
    constructor(
        private readonly wishlistRepository: WishlistRepository,
        private readonly userRepository: UserRepository,
    ) {}
    
    async todocreationWishlist(userId: string, dto: CreateWishlistDto): Promise<Wishlist> {
        const user = await this.userRepository.findById(userId);
        if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

        const wishlist = this.wishlistRepository.create({
            ...dto,
            owner: user,
        })

        // const sameNameWishlist = await this.wishlistRepository.findOne({
        //     where: {
        //         name: dto.name,
        //         owner: userId,
        //     },
        // });

        // if (sameNameWishlist) {
        //     throw new ConflictException(`A wishlist with the name "${dto.name}" already exists.`);
        // }
        return this.wishlistRepository.save(wishlist);


    }}
