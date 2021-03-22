import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagesController } from './messages/messages.controller';

@Module({
  imports: [],
  controllers: [MessagesController],
  providers: [AppService],
})
export class AppModule {}
