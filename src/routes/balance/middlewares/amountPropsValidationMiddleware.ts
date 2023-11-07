import { RequestHandler } from 'express';
import { isInteger, isNumber } from 'lodash';

export const amountPropsValidationMiddleware: RequestHandler<{ user_id: string }, unknown, { amount: number }> = (req, res) => {
  const amount = req.body.amount;
  if (!isNumber(amount)) {
    return res.status(400).json({ message: '"amount" body props should be number' });
  }
  if (isInteger(amount)) {
    return res.status(400).json({ message: '"amount" body props should not integer' });
  }
  if (amount < 0) {
    return res.status(400).json({ message: '"amount" body props should not be negative' });
  }
  req.next();
};
