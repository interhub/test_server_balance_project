import { UserModel } from '../models/user.model';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

class UserService {
  public getUserById = async (user_id: string): Promise<UserModel | undefined> => {
    try {
      return;
    } catch (e) {
      console.log(e, 'getUserById_ err', { user_id });
    }
  };

  public getUserBy = async (props: Partial<UserModel>): Promise<UserModel | undefined> => {
    try {
      return;
    } catch (e) {
      console.log(e, 'getUserBy_ err', { props });
    }
  };

  public getBalanceById = async (user_id: string): Promise<number> => {
    try {
      return;
    } catch (e) {
      console.log(e, 'getBalanceById_ err', { user_id });
      return 0;
    }
  };

  public getAllUsers = async (): Promise<UserModel[]> => {
    try {
      return [];
    } catch (e) {
      console.log(e, 'getAllUsers_ err');
      return [];
    }
  };

  public createUser = async (data: CreateUserDto): Promise<UserModel | undefined> => {
    try {
      return;
    } catch (e) {
      console.log(e, 'createUser_ err', { data });
    }
  };

  public updateUser = async (user_id: string, data: UpdateUserDto): Promise<UserModel | undefined> => {
    try {
      return;
    } catch (e) {
      console.log(e, 'updateUser_ err', { user_id, data });
    }
  };

  public initTestUser = async () => {
    const users = await this.getAllUsers();
    if (users?.length) {
      return;
    }
    const defaultTestUserBalance = 10000;
    await this.createUser({ balance: defaultTestUserBalance });
  };
}

const userService = new UserService();

export default userService;
