import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Rabbit Send Massage')
@Controller('message')
export class MessageController {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Get('/send')
  async send() {
    for (let a = 0; a < 1000; a++) {
      this.amqpConnection.publish('exchange1', 'rpc-route', {
        msg: 'hello world',
      });
    }
    return 'ok';
  }

}
