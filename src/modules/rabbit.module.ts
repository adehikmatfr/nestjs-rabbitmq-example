import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { MessageController } from 'src/controllers/message/message.controller';
import { MessagingService } from '../services/message/message.service';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'exchange1',
          type: 'topic',
        },
      ],
      uri: 'amqp://guest:guest@localhost:5672',
    }),
    RabbitModule,
  ],
  providers: [MessagingService],
  controllers: [MessageController],
})
export class RabbitModule {}
