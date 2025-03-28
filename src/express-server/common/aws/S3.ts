import {
  S3Client,
  DeleteObjectCommand,
  PutObjectCommand,
  PutObjectOutput,
  GetObjectCommand,
  HeadObjectCommand,
  HeadObjectCommandOutput,
  CopyObjectCommand,
  CopyObjectOutput,
  ListObjectsCommand,
  ListObjectsOutput,
  ListObjectsCommandInput,
  GetBucketCorsCommand,
  GetObjectCommandOutput,
  PutObjectTaggingCommand,
  Tag,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3ClientConfig } from '@aws-sdk/client-s3/dist-types/S3Client';
import { GetBucketCorsCommandOutput } from '@aws-sdk/client-s3/dist-types/commands/GetBucketCorsCommand';
export { Tag } from '@aws-sdk/client-s3';

export default class S3 {
  public readonly s3Client: S3Client;

  public static readonly urlExpiresIn = 60 * 30;

  constructor(paramsOverride?: S3ClientConfig) {
    this.s3Client = new S3Client(paramsOverride || {});
  }

  async putJsonObject(
    bucket: string,
    key: string,
    body: Record<string, unknown>,
    paramsOverride?: Record<string, unknown>
  ): Promise<PutObjectOutput> {
    const params = {
      Bucket: bucket,
      Key: key,
      Body: JSON.stringify(body),
      ContentType: 'application/json',
      ...paramsOverride,
    };
    const command = new PutObjectCommand(params);
    return this.s3Client.send(command);
  }

  async deleteObject(bucket: string, key: string): Promise<void> {
    const command = new DeleteObjectCommand({ Bucket: bucket, Key: key });
    await this.s3Client.send(command);
  }

  async headObject(bucket: string, key: string): Promise<HeadObjectCommandOutput> {
    const command = new HeadObjectCommand({ Bucket: bucket, Key: key });
    return this.s3Client.send(command);
  }

  async hasKeyInBucket(bucket: string, key: string): Promise<boolean> {
    try {
      const metadata = await this.headObject(bucket, key);
      return metadata != null;
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }

  async getAsJsonObject(bucket: string, key: string): Promise<Record<string, unknown>> {
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    const res = await this.s3Client.send(command);
    if (res.Body) {
      const dataStr = await res.Body.transformToString('utf-8');
      return JSON.parse(dataStr);
    }
    return {};
  }

  async getDownloadUrl(
    bucket: string,
    key: string,
    expiresIn: number = S3.urlExpiresIn,
    paramsOverride?: Record<string, unknown>
  ): Promise<string> {
    const params = {
      Bucket: bucket,
      Key: key,
      ...paramsOverride,
    };

    const command = new GetObjectCommand(params);
    return this.getSignedUrl(command, expiresIn);
  }

  async getUploadUrl(
    bucket: string,
    key: string,
    expiresIn: number = S3.urlExpiresIn,
    paramsOverride?: Record<string, unknown>
  ): Promise<string> {
    const params = {
      Bucket: bucket,
      Key: key,
      ...paramsOverride,
    };
    const command = new PutObjectCommand(params);
    return this.getSignedUrl(command, expiresIn);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
  async getSignedUrl(command: any, expiresIn?: number): Promise<string> {
    return getSignedUrl(this.s3Client, command, { expiresIn });
  }

  async getObject(bucket: string, key: string): Promise<GetObjectCommandOutput> {
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    return this.s3Client.send(command);
  }

  async upload(bucket: string, key: string, paramsOverride?: Record<string, unknown>): Promise<PutObjectOutput> {
    const params = {
      Bucket: bucket,
      Key: key,
      ...paramsOverride,
    };
    const command = new PutObjectCommand(params);
    return this.s3Client.send(command);
  }

  async listBucketObjects(bucket: string, prefix: string, delimiter?: string): Promise<ListObjectsOutput> {
    let params: ListObjectsCommandInput = {
      Bucket: bucket,
      Prefix: prefix,
    };
    if (delimiter) params = { ...params, Delimiter: delimiter };
    const command = new ListObjectsCommand(params);
    return this.s3Client.send(command);
  }

  async copyObjectInBucket(bucket: string, sourceKey: string, destinationKey: string): Promise<CopyObjectOutput> {
    return this.copyObjectToAnotherBucket(bucket, sourceKey, bucket, destinationKey);
  }

  async copyObjectToAnotherBucket(
    sourceBucket: string,
    sourceKey: string,
    destinationBucket: string,
    destinationKey: string
  ): Promise<CopyObjectOutput> {
    const input = {
      CopySource: `/${sourceBucket}/${sourceKey}`,
      Bucket: destinationBucket,
      Key: destinationKey,
    };
    const command = new CopyObjectCommand(input);
    return this.s3Client.send(command);
  }

  public async getBucketCors(bucket: string): Promise<GetBucketCorsCommandOutput> {
    const command = new GetBucketCorsCommand({ Bucket: bucket });
    return this.s3Client.send(command);
  }

  public async putObjectTagging(bucket: string, key: string, tags: Tag[]): Promise<void> {
    const command = new PutObjectTaggingCommand({
      Bucket: bucket,
      Key: key,
      Tagging: { TagSet: tags },
    });

    await this.s3Client.send(command);
  }
}
