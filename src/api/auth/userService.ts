import { User } from './models';
import { v4 as uuidv4 } from 'uuid';
import userData from './userDatabase';

class UserService {
  public createUser = (email: string, password: string): User | null => {
    const users: User[] = userData.filter((x) => x.email === email);
    if (users.length !== 0) {
      // should not match any pre-existing users
      return null; // conflict error
    }

    const newUser: User = { id: uuidv4(), email, password };

    userData.push(newUser); // add user to 'database'

    return newUser;
  };

  getUser = (email: string, password: string): User | null => {
    const users: User[] = userData.filter(
      (x) => x.email === email && x.password === password
    );
    if (users.length !== 1) {
      // should only match a single user
      return null; // error
    }

    const user: User = users[0];

    return user;
  };

  // IMPORTANT!: it would be good to implement an authorised
  //             endpoint to modify that only the root user
  //             or someone with higher clearance
}

export default UserService;
