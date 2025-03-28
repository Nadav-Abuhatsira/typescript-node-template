import { DynamoDBDocument, ScanCommandInput } from '@aws-sdk/lib-dynamodb';
import {
  DescribeTableCommand,
  DescribeTableCommandOutput,
  DynamoDBClient,
  DynamoDBClientConfig,
} from '@aws-sdk/client-dynamodb';
import _ from 'lodash';

export const DEFAULT_PAGE_SIZE = 25;

export interface ScanOutput {
  items: Record<string, unknown>[] | undefined;
  lastSeen: Record<string, unknown> | undefined;
}

export default class DynamoDbTable {
  public readonly tableName: string;

  public readonly dbClient: DynamoDBClient;

  public readonly docClient: DynamoDBDocument;

  constructor(tableName: string, paramsOverride?: DynamoDBClientConfig) {
    this.tableName = tableName;
    this.dbClient = new DynamoDBClient(paramsOverride || {});
    const translateConfig = { marshallOptions: { removeUndefinedValues: true } };
    this.docClient = DynamoDBDocument.from(this.dbClient, translateConfig);
  }

  public async get(keyObj: Record<string, unknown>): Promise<unknown> {
    const getParams = {
      TableName: this.tableName,
      Key: keyObj,
    };
    const data = await this.docClient.get(getParams);
    return data.Item;
  }

  public async scan(lastSeen?: Record<string, unknown>, limit = DEFAULT_PAGE_SIZE): Promise<ScanOutput> {
    const scanCommandInput: ScanCommandInput = {
      TableName: this.tableName,
      Limit: limit,
      ExclusiveStartKey: lastSeen,
    };

    const result = await this.docClient.scan(scanCommandInput);

    return {
      items: result.Items,
      lastSeen: result.LastEvaluatedKey,
    };
  }

  public async put(item: Record<string, unknown>): Promise<unknown> {
    const putParams = {
      TableName: this.tableName,
      Item: item,
    };
    return this.docClient.put(putParams);
  }

  public static createUpdateParams(
    keyObj: Record<string, unknown>,
    item: Record<string, unknown>
  ): Record<string, unknown> {
    const itemNoKey = _.omit(item, Object.keys(keyObj));
    const keys = Object.keys(itemNoKey);
    const entries = Object.entries(itemNoKey);
    return {
      UpdateExpression: `set ${keys.map((k) => `#${k} = :${k}`).join(', ')}`,
      ExpressionAttributeNames: entries.reduce((acc, cur) => ({ ...acc, [`#${cur[0]}`]: cur[0] }), {}),
      ExpressionAttributeValues: entries.reduce((acc, cur) => ({ ...acc, [`:${cur[0]}`]: cur[1] }), {}),
    };
  }

  public async update(
    keyObj: Record<string, unknown>,
    item: Record<string, unknown>,
    additionalParams?: Record<string, unknown>
  ): Promise<unknown> {
    const updateParamsWithAdditionalParams = _.merge(
      {},
      DynamoDbTable.createUpdateParams(keyObj, item),
      additionalParams
    );
    const updateParams = {
      TableName: this.tableName,
      Key: keyObj,
      ...updateParamsWithAdditionalParams,
    };
    return this.docClient.update(updateParams);
  }

  public async delete(keyObj: Record<string, unknown>): Promise<unknown> {
    const deleteParams = {
      TableName: this.tableName,
      Key: keyObj,
    };
    return this.docClient.delete(deleteParams);
  }

  public async query(params: Record<string, unknown>): Promise<unknown> {
    const queryParams = {
      TableName: this.tableName,
      ...params,
    };
    const res = await this.docClient.query(queryParams);
    return res.Items;
  }

  public async batchGet(itemsKeyObj: Record<string, unknown>[]): Promise<unknown> {
    const batchGetParams = {
      RequestItems: {
        [this.tableName]: {
          Keys: itemsKeyObj,
        },
      },
    };
    const res = await this.docClient.batchGet(batchGetParams);
    return _.get(res, ['Responses', this.tableName]);
  }

  public async batchPut(items: Record<string, unknown>[]): Promise<unknown> {
    const batchPutParams = {
      RequestItems: {
        [this.tableName]: items.map((item: Record<string, unknown>) => ({
          PutRequest: {
            Item: item,
          },
        })),
      },
    };
    return this.docClient.batchWrite(batchPutParams);
  }

  public async batchDelete(itemsKeyObj: Record<string, unknown>[]): Promise<unknown> {
    const batchDeleteParams = {
      RequestItems: {
        [this.tableName]: itemsKeyObj.map((itemKeyObj: Record<string, unknown>) => ({
          DeleteRequest: {
            Key: itemKeyObj,
          },
        })),
      },
    };
    return this.docClient.batchWrite(batchDeleteParams);
  }

  public async describeTable(): Promise<DescribeTableCommandOutput> {
    return this.dbClient.send(new DescribeTableCommand({ TableName: this.tableName }));
  }

  public async verifyTableExistsOrThrow(): Promise<void> {
    try {
      await this.describeTable();
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (e.name === 'ResourceNotFoundException') {
        throw new Error(`Table ${this.tableName} not found`);
      } else {
        throw e;
      }
    }
  }
}
