import { IS_DEV } from '../constants/IS_DEV';
import { PORT } from '../constants/PORT';
import moment from 'moment';

export const onStartedServer = async () => {
  const time = moment().toISOString(true);
  const message = `The server started successfully after the update ✅. DEV=${IS_DEV}. PORT=${PORT}. ${time}`;
  console.log(message);
};
