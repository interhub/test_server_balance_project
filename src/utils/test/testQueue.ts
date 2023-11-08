import queueBalanceUtil from '../queueBalanceUtil';
import { waitForMs } from './waitForMs';

const testQueue = async () => {
  const taskTest = async (index: number) => {
    const { task_id } = await queueBalanceUtil.startActionTask();
    await waitForMs(100);
    console.log('task with index', index, 'completed');
    await queueBalanceUtil.finishActionTask(task_id);
  };
  for (let i = 0; i < 100; i++) {
    taskTest(i);
  }

  queueBalanceUtil.handleEmptyEvent(() => {
    console.log('EMPTY!');
  });
};
testQueue();
