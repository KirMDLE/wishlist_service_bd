import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Wishlist } from "./wishlist.entity";

@Entity()
export class WishlistItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: true})
  url: string;

//   @Column({nullable: true})
//   imageUrl: string;

//   @Column({default: 0})
//   price: number;

//   @Column({default: 0})
//   quantity: number;

//   @Column({default: false})
//   purchased: boolean;

//   @Column({default: false})
//   archived: boolean;

//   @Column()
//   wishlistId: string;

//   @Column()
//   userId: string;

  @Column()
  name: string;
  
  @Column()
  description: string;

  @ManyToOne(() => WishlistItem, (wishlist) =>wishlist.items)
    wishlist: WishlistItem;

  @ManyToOne(() => User, { nullable: true })
  reservedBy: User | null;

//   @Column({ nullable: true })
//   reservedUntil: Date | null;

//   @Column({ default: false })
//   isReserved: boolean;
}



  