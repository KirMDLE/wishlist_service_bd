import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import type { PublicUserData } from '@user/index';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    


    async create(userData: Partial<User>): Promise<User> {
        const user = this.usersRepository.create(userData);
        return this.usersRepository.save(user); 
      }
    
      async findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email } });
      }
    
    async getUserByName(name: string): Promise<PublicUserData | null> {
        const user = await this.userRepository.getUserByPublicName(name);
        return user;
      }
    
      async getUser(dto: Partial<User>): Promise<User | null> {
        const user = await this.userRepository.getUser(dto);
        return user;
      }
    }
    
