import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
// import type { PublicUserData } from '@user/index';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    


    async create(userData: Partial<User>): Promise<User> {
        const user = this.userRepository.create(userData);
        return this.userRepository.save(user); 
      }
    
      async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
      }
  
    
    async getUserByName(firstName: string): Promise<User | null> {
        return this.userRepository.findOne({
            where: { firstName }
        });
    }
      }
    
      async getUser(dto: Partial<User>): Promise<User | null> {
        const user = await this.userRepository.getUser(dto);
        return user;
      }
    
