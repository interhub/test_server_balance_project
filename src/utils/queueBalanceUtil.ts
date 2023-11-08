import { v4 } from 'uuid';
import { head } from 'lodash';

enum TASK_STATUS {
  WAITING = 'WAITING',
  IN_PROGRESS = 'IN_PROGRESS',
}

const logs = false;

class QueueBalanceUtil {
  private queue: { task_id: string; play: () => any; index: number; status: TASK_STATUS }[] = [];
  private index = 0;

  public startActionTask = async (): Promise<{ task_id: string }> => {
    const task_id = v4();
    if (logs) {
      console.log({ task_id }, 'started');
    }
    await new Promise<void>((ok) => {
      const someInProgress = this.queue.some((t) => t.status === TASK_STATUS.IN_PROGRESS);
      if (someInProgress) {
        this.queue.push({ task_id, play: ok, index: this.index++, status: TASK_STATUS.WAITING });
      } else {
        this.queue.push({ task_id, play: ok, index: this.index++, status: TASK_STATUS.IN_PROGRESS });
        ok();
      }
    });
    if (logs) {
      console.log({ task_id }, 'finished after start');
    }
    return { task_id };
  };

  public finishActionTask = async (task_id: string) => {
    if (logs) {
      console.log('start task finishing', { task_id });
    }
    this.removeTask(task_id);
    const nextTask = head(this.queue);
    if (nextTask) {
      this.updateTaskStatus(nextTask.task_id, TASK_STATUS.IN_PROGRESS);
      nextTask.play();
    }
    if (!nextTask) {
      this.onEmptyCb();
    }
    if (logs) {
      console.log({ task_id, next_task_id: nextTask?.task_id, next_index: nextTask?.index }, 'completed started next');
    }
  };

  public removeTask = (task_id: string) => {
    this.queue = this.queue.filter((t) => t.task_id !== task_id);
    if (logs) {
      console.log({ task_id }, 'removed');
    }
  };

  private updateTaskStatus = (task_id: string, status: TASK_STATUS) => {
    const taskIndex = this.queue.findIndex((t) => t.task_id === task_id);
    if (taskIndex < 0) return;
    this.queue[taskIndex].status = status;
  };

  private onEmptyCb = () => {};
  public handleEmptyEvent = async (cb: () => any) => {
    this.onEmptyCb = cb;
  };
}

const queueBalanceUtil = new QueueBalanceUtil();

export default queueBalanceUtil;
