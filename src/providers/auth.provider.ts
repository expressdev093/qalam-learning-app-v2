import {AuthProvider} from '@refinedev/core';
import {myCustomDataProvider} from './data.provider';
import {IUser} from '../interfaces';
import {RouteNames} from '../navigations/constants/route.name';

interface IAuthenticate {
  data: {
    user: IUser;
    token: string;
  };
}

export const authProvider: AuthProvider = {
  login: async ({username, email, password}) => {
    if ((username || email) && password) {
      const {data} = await myCustomDataProvider.custom<IAuthenticate>({
        url: myCustomDataProvider.getApiUrl() + '/auth/user-login',
        method: 'post',
        payload: {
          email: email,
          password: password,
        },
      });
      return {
        success: true,
        redirectTo: RouteNames.homeDrawer,
        ...data,
      };
    }

    return {
      success: false,
      error: {
        name: 'LoginError',
        message: 'Invalid username or password',
      },
    };
  },
  logout: async () => {
    return {
      success: true,
      redirectTo: '/login',
    };
  },
  check: async () => {
    return {
      authenticated: false,
      redirectTo: '/login',
    };
  },
  getPermissions: async () => {
    return [];
  },
  getIdentity: async () => {
    return null;
  },
  onError: async error => {
    console.error(error);
    return {error};
  },
  forgotPassword: async ({email}: any) => {
    if (email) {
      const {data} = await myCustomDataProvider.custom<IAuthenticate>({
        url: myCustomDataProvider.getApiUrl() + '/auth/forgot-password',
        method: 'post',
        payload: {
          email: email,
        },
      });
      return {
        success: true,
        redirectTo: RouteNames.login,
      };
    }
    return {
      success: false,
      redirectTo: RouteNames.login,
      error: {
        name: 'Forgot Password Error',
        message: 'Invalid email/Email not found',
      },
    };
  },
  updatePassword: async ({confirmPassword, token}: any) => {
    return {
      success: false,
      error: {
        name: 'Reset Password Error',
        message: 'Invalid token or email',
      },
    };
  },
};
