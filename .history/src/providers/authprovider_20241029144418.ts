import {AuthProvider} from '@refinedev/core';

export const authProvider: AuthProvider = {
  login: async ({username, email, password}) => {
    if ((username || email) && password) {
      const {data} = await dataProvider.custom<IAuthenticate>({
        url: dataProvider.getApiUrl() + '/auth/admin-login',
        method: 'post',
        payload: {
          email: email,
          password: password,
        },
      });
      return {
        success: true,
        redirectTo: '/',
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
    return {
      success: false,
      redirectTo: '/login',
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
