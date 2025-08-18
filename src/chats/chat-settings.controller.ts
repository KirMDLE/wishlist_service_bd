import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { JwtAccessTokenGuard } from '@guards/jwt.access-token.guard';
import { AuthUser } from '@shared/decorators/auth-user.decorator';
import { UpdateChatSettingsDto } from '@chats/dto/update-chat-settings.dto';
import { UpdateChatSettingsUseCase } from '@chats/application/usecase/update-chat-settings.usecase';

export enum TranslationMode {
  disabled = 'disabled',
  onlyForeign = 'onlyForeignLanguage',
  always = 'alwaysTranslate',
}

@Controller('chat/settings')
@UseGuards(JwtAccessTokenGuard)
export class ChatSettingsController {
  constructor(private readonly updateChatSettings: UpdateChatSettingsUseCase) {}

  @Put()
  update(
    @AuthUser('id') userId: string,
    @Body() dto: UpdateChatSettingsDto,
  ) {
    return this.updateChatSettings.execute(userId, dto);
  }

  @Get()
  get(@AuthUser('id') userId: string) {
    return this.updateChatSettings.execute(userId, {
      translationMode: TranslationMode.disabled,
    } as UpdateChatSettingsDto);
  }
  
}
