import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findById(id: string): Promise<User | null> {
    return this.findOne({ where: { id } });
  }

  

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.create(userData);
    return this.save(user);
  }

  async getUserByName(firstName: string): Promise<User | null> {
    return this.findOne({ where: { firstName } });
  }
} 