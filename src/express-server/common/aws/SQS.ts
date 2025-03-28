import {
  CreateQueueCommand,
  CreateQueueCommandInput,
  DeleteQueueCommand,
  DeleteQueueCommandInput,
  DeleteQueueCommandOutput,
  GetQueueAttributesCommand,
  GetQueueAttributesCommandInput,
  ReceiveMessageCommand,
  ReceiveMessageCommandInput,
  ReceiveMessageCommandOutput,
  SendMessageCommand,
  SendMessageCommandInput,
  SendMessageCommandOutput,
  SetQueueAttributesCommand,
  SetQueueAttributesCommandInput,
  SetQueueAttributesCommandOutput,
  QueueAttributeName,
  SQSClient,
  SQSClientConfig,
} from '@aws-sdk/client-sqs';

export default class SQS {
  public readonly sqsClient: SQSClient;

  public readonly queueUrl: string;

  constructor(queueUrl: string, paramsOverride?: SQSClientConfig) {
    this.queueUrl = queueUrl;
    this.sqsClient = SQS.createSQSClient(paramsOverride);
  }

  static createSQSClient(paramsOverride?: SQSClientConfig): SQSClient {
    return new SQSClient(paramsOverride || {});
  }

  static async createQueue(
    name: string,
    messageRetentionPeriod = '300',
    paramsOverride?: SQSClientConfig
  ): Promise<SQS> {
    const input: CreateQueueCommandInput = {
      QueueName: name,
      Attributes: { MessageRetentionPeriod: messageRetentionPeriod },
    };
    const response = await SQS.createSQSClient(paramsOverride).send(new CreateQueueCommand(input));
    if (!response.QueueUrl) {
      throw new Error('Queue URL is empty.');
    }
    return new SQS(response.QueueUrl);
  }

  async getQueueAttributes(attributeNames: QueueAttributeName[]): Promise<Record<string, string> | undefined> {
    const input: GetQueueAttributesCommandInput = { QueueUrl: this.queueUrl, AttributeNames: attributeNames };
    const response = await this.sqsClient.send(new GetQueueAttributesCommand(input));
    return response.Attributes;
  }

  async getArn(): Promise<string> {
    const arnKey = 'QueueArn';
    const attributes = await this.getQueueAttributes([arnKey]);
    if (!attributes || !attributes[arnKey]) {
      throw new Error(`Missing either Attributes or ${arnKey} attribute in the response.`);
    }
    return attributes[arnKey];
  }

  async setQueueAttributes(attributes: Record<string, string>): Promise<SetQueueAttributesCommandOutput> {
    const input: SetQueueAttributesCommandInput = { QueueUrl: this.queueUrl, Attributes: attributes };
    return this.sqsClient.send(new SetQueueAttributesCommand(input));
  }

  async setPolicy(policy: string): Promise<void> {
    await this.setQueueAttributes({ Policy: policy });
  }

  async sendMessage(message: string, paramsOverride?: Record<string, unknown>): Promise<SendMessageCommandOutput> {
    const input: SendMessageCommandInput = { QueueUrl: this.queueUrl, MessageBody: message, ...paramsOverride };
    return this.sqsClient.send(new SendMessageCommand(input));
  }

  async receiveMessage(
    waitTimeSeconds: number,
    paramsOverride?: Record<string, unknown>
  ): Promise<ReceiveMessageCommandOutput> {
    const input: ReceiveMessageCommandInput = {
      QueueUrl: this.queueUrl,
      WaitTimeSeconds: waitTimeSeconds,
      ...paramsOverride,
    };
    return this.sqsClient.send(new ReceiveMessageCommand(input));
  }

  async deleteQueue(): Promise<DeleteQueueCommandOutput> {
    const input: DeleteQueueCommandInput = { QueueUrl: this.queueUrl };
    return this.sqsClient.send(new DeleteQueueCommand(input));
  }
}
