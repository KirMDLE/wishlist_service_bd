import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { Wishlist } from 

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>
  ) {}

  async addItem(wishlistId: string, createItemDto: CreateItemDto): Promise<Item> {
    const wishlist = await this.wishlistRepository.findOne({ where: { id: wishlistId } });
    if (!wishlist) throw new NotFoundException('Wishlist not found');
    const item = this.itemRepository.create({ ...createItemDto, wishlist });
    return this.itemRepository.save(item);
  }

  async getItems(wishlistId: string): Promise<Item[]> {
    return this.itemRepository.find({ where: { wishlist: { id: wishlistId } } });
  }
}