import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';

export default class SES {
  private fromUser: string;

  private toUser: string;

  private messageSubject: string;

  private messageBody: string;

  constructor(toUser: string, messageSubject: string, messageBody: string, fromUser = 'no-reply@br.io') {
    this.toUser = toUser;
    this.fromUser = fromUser;
    this.messageSubject = messageSubject;
    this.messageBody = messageBody;
  }

  getEmailCommand(): SendEmailCommand {
    return new SendEmailCommand({
      Destination: {
        ToAddresses: [this.toUser],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: this.messageBody,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: this.messageSubject,
        },
      },
      Source: `${this.fromUser}`,
    });
  }

  async sendEmail(): Promise<void> {
    try {
      const sesClient = new SESClient({ region: 'us-west-2' });
      const data = await sesClient.send(this.getEmailCommand());
      console.log(`Email sent successfully to ${this.toUser}, data: ${data}`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
