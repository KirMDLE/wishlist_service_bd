import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';


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

    async findOne(id: string): Promise<User> {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException('User not found');
      return user;
    }

    
    async update(id: string, dto: UpdateUserDto): Promise<User> {
      await this.userRepository.update(id, dto);
      return this.findOne(id);
    }
  
    async remove(id: string): Promise<void> {
      const user = await this.findOne(id);
      await this.userRepository.remove(user);
    }

    
      }

