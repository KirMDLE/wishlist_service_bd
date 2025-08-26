import { isEmail } from "class-validator";
import { Wishlist } from "src/wishlists/entities/wishlist.entity";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn
  } from 'typeorm';
  import { Exclude } from 'class-transformer';


@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  publicId: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;


  @Column()
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;



  @Column({ default: false })
  isActivated: boolean;

 
 
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;


  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];




@Column({
  type: 'varchar', 
  default: 'en' ,
})
preferredLanguage: string;


}

//   @OneToMany(() => User, (user) => user.id)
//   contacts: User[]