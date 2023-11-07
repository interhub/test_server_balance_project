import { Router } from 'express';
import { checkUserIdPathParam } from '../../middlewares/checkUserIdPathParam';
import { amountPropsValidationMiddleware } from './middlewares/amountPropsValidationMiddleware';
import balanceService from '../../services/balance.service';
import { UserModel } from '../../models/user.model';

const app = Router();

app.use(checkUserIdPathParam);

app.use(amountPropsValidationMiddleware);
app.put<{ user_id: string }, BalanceActionResponseType, { amount: number }>('/increase/:user_id', async (req, res) => {
  const user_id = req.params?.user_id;
  const amount = req.body.amount;
  const { success, balance, user } = await balanceService.increaseBalanceBy(user_id, amount);
  return res.status(200).json({ success, balance, user });
});
app.put<{ user_id: string }, BalanceActionResponseType, { amount: number }>('/decrease/:user_id', async (req, res) => {
  const user_id = req.params?.user_id;
  const amount = req.body.amount;
  const { success, balance, user } = await balanceService.decreaseBalanceBy(user_id, amount);
  return res.status(200).json({ success, balance, user });
});

type BalanceActionResponseType = {
  success?: boolean;
  message?: string;
  user?: UserModel;
  balance?: number;
};

export default app;
