import { isEmail } from "class-validator";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn
  } from 'typeorm';


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
  passwordHash: string;



  @Column({ default: false })
  isActivated: boolean;

 
 
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

}

//   @OneToMany(() => User, (user) => user.id)
//   contacts: User[]