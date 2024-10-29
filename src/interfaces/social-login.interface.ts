import {LoginProvider} from './enum';

export interface ISocialLogin {
  provider: LoginProvider;
  firstName: string;
  lastName: string;
  avatar: string | null;
  email: string;
}
