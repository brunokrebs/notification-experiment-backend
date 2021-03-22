import { Controller, Get, Post } from '@nestjs/common';
import { Consumer } from 'sqs-consumer';
import { config, SQS } from 'aws-sdk';

@Controller('messages')
export class MessagesController {
  private sqsClient = null;
  private queueUrl =
    'http://localhost:4566/000000000000/notification-experiment-queue';

  constructor() {
    config.update({
      region: 'us-east-1',
      accessKeyId: 'foo',
      secretAccessKey: 'bar',
    });

    const app = Consumer.create({
      queueUrl: this.queueUrl,
      handleMessage: async (message) => {
        console.log(
          `The following message was handled by ${process.env.INSTANCE_ID}:`,
        );
        console.log(message.Body);
        console.log('----------------------------------');
        setTimeout(() => {
          this.sendMessage();
        }, 5000);
      },
      sqs: new SQS({
        apiVersion: '2012-11-05',
      }),
    });

    app.on('error', (err) => {
      console.error(err.message);
    });

    app.on('processing_error', (err) => {
      console.error(err.message);
    });

    app.start();

    this.sqsClient = new SQS({
      apiVersion: '2012-11-05',
    });
  }

  @Get()
  public getMessage(): string {
    return `I'm alive and well, thanks: ${process.env.INSTANCE_ID}.`;
  }

  private sendMessage() {
    const params = {
      MessageBody: `Message timestamp ${new Date().toISOString()}`,
      QueueUrl: this.queueUrl,
      MessageAttributes: {
        SomeAttr: {
          DataType: 'String',
          StringValue: 'cool beans',
        },
      },
    };

    this.sqsClient.sendMessage(params, (err, result) => {
      if (err) return console.log(err);
      console.log('message sent: ' + result.MessageId);
      console.log('----------------------------------');
    });
  }

  @Post()
  public addMessage(): void {
    this.sendMessage();
  }
}
