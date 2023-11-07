import userService from './user.service';
import { UserModel } from '../models/user.model';

type BalanceActionResult = { user?: UserModel; balance: number; success: boolean };

class BalanceService {
  public increaseBalanceBy = async (user_id: string, amount: number): Promise<BalanceActionResult> => {
    const currentBalance = await userService.getBalanceById(user_id);
    const newBalance = currentBalance + amount;
    const user = await userService.updateUser(user_id, { balance: newBalance });
    return { user, balance: newBalance, success: true };
  };

  public decreaseBalanceBy = async (user_id: string, amount: number): Promise<BalanceActionResult> => {
    const currentBalance = await userService.getBalanceById(user_id);
    const newBalance = currentBalance - amount;
    if (newBalance < 0) {
      return { balance: currentBalance, success: false };
    }
    const user = await userService.updateUser(user_id, { balance: newBalance });
    return { user, balance: newBalance, success: true };
  };

  public setBalance = async (user_id: string, balance: number): Promise<BalanceActionResult> => {
    const currentBalance = await userService.getBalanceById(user_id);
    if (balance < 0) return { balance: currentBalance, success: false };
    const user = await userService.updateUser(user_id, { balance });
    return { user, balance, success: true };
  };
}

const balanceService = new BalanceService();

export default balanceService;
