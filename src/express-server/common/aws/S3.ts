import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { S3ClientConfig } from '@aws-sdk/client-s3/dist-types/S3Client';

export default class S3 {
  public readonly client: S3Client;

  constructor(config: S3ClientConfig) {
    this.client = new S3Client(config);
  }

  async getS3AsJson(bucket: string, key: string): Promise<any> {
    const input = { Bucket: bucket, Key: key };
    const command = new GetObjectCommand(input);
    const response = await this.client.send(command);
    if (response.Body == null) return null;
    const str = await response.Body.transformToString();
    return JSON.parse(str);
  }
}
