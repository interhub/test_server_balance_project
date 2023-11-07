import AWS from 'aws-sdk';

const mq = new AWS.SQS({
  region: 'ru-central1',
  endpoint: 'https://message-queue.api.cloud.yandex.net',
  credentials: {
    accessKeyId: 'YCAJE4ERwvGTmmi4xEda73iXx',
    secretAccessKey: 'YCPIuYR4Jhk_scZ3Vhp9yF_V3uQKiOd7Si17Bw7y',
  },
});

const queueUrl = 'https://message-queue.api.cloud.yandex.net/b1g8clh0g34jn32gn7og/dj600000000vuijk07bg/test-queue';
const logs = false;

class QueueBalanceUtil {
  constructor() {
    this.clearStack();
  }

  private clearStack = async () => {
    const res = await mq.purgeQueue({ QueueUrl: queueUrl }).promise();
    const data = res?.$response?.data;
    if (logs) {
      console.log(data, 'messages removed');
    }
  };

  public startActionTask = async () => {
    const params: AWS.SQS.SendMessageRequest = {
      QueueUrl: queueUrl,
      MessageBody: '',
    };

    const result = await mq.sendMessage(params).promise();
    const messageId = result?.MessageId || '';
    if (logs) {
      console.log('message sent', messageId);
    }
  };

  public finishActionTask = async () => {
    const params = {
      QueueUrl: queueUrl,
      WaitTimeSeconds: 10,
      MaxNumberOfMessages: 1,
    };

    const result = await mq.receiveMessage(params).promise();
    const messages = result?.Messages || [];

    if (logs) {
      console.log(messages.length, 'result receive messages len');
    }

    messages.forEach(async function (msg) {
      const messageId = msg['MessageId'];
      if (logs) {
        console.log('message received', messageId);
      }

      const deleteParams: AWS.SQS.DeleteMessageRequest = {
        QueueUrl: queueUrl,
        ReceiptHandle: msg['ReceiptHandle'],
      };
      await mq.deleteMessage(deleteParams).promise();
    } as any);
  };
}

const queueBalanceUtil = new QueueBalanceUtil();

export default queueBalanceUtil;
