import { Controller, Get } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  private controllerId = Date.now();

  @Get()
  public getMessage(): string {
    return `I'm alive and well, thanks: ${this.controllerId}.`;
  }
}
