import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@user/entities/user.entity';

export enum TranslationMode {
  disabled = 'disabled',
  onlyForeign = 'onlyForeignLanguage',
  always = 'alwaysTranslate',
}

@Entity('chat_settings')
export class ChatSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;
  


  @Column({
    type: 'enum',
    enum: TranslationMode,
    default: TranslationMode.disabled,
  })
  translationMode: TranslationMode;

  @Column({ default: 'en' })
  targetLanguage: string;
}
