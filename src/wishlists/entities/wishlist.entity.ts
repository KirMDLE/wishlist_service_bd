import { User } from 'src/users/entities/user.entity';s
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WishlistItem } from './wishlist-item.entity';

@Entity()
export class Wishlist {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    ownerId: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ default: false })
    isPublic: boolean;

    @ManyToOne(() => User, (user) => user.wishlists)
    owner: User;

    @OneToMany(() => WishlistItem, (item) => item.wishlist)
    items: WishlistItem[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}