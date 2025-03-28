import {
  SecretsManagerClient,
  SecretsManagerClientConfig,
  GetSecretValueCommand,
  GetSecretValueCommandOutput,
} from '@aws-sdk/client-secrets-manager';

export default class SecretsManager {
  public readonly secretsManagerClient: SecretsManagerClient;

  constructor(paramsOverride?: SecretsManagerClientConfig) {
    this.secretsManagerClient = new SecretsManagerClient(paramsOverride || {});
  }

  async getSecret(secretName: string): Promise<GetSecretValueCommandOutput> {
    const command = new GetSecretValueCommand({ SecretId: secretName });
    return this.secretsManagerClient.send(command);
  }

  async getSecretKey(secretName: string, valueKey: string): Promise<string> {
    const response = await this.getSecret(secretName);
    if (response.SecretString) {
      const secretData = JSON.parse(response.SecretString);
      return secretData[valueKey];
    }
    throw new Error('No value found in secrets manager');
  }
}
