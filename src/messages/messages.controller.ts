import { Controller, Get } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Get()
  public getMessage(): string {
    return `I'm alive and well, thanks: ${process.env.INSTANCE_ID}.`;
  }
}
