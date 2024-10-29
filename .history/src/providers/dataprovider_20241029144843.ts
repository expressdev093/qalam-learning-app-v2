import {axiosInstance} from '@refinedev/nestjsx-crud';
import {dataProvider} from '../nestjsx-crud';
import {API_URL} from '@env';

export const TOKEN_KEY = 'qalam-learning-app-key-auth';
export const USER_KEY = 'qalam-learning-app-key-user';

const customDataProvider = () => {
  axiosInstance.interceptors.request.use((config: any) => {
    config.headers = {
      ...config.headers, // Change config.header to config.headers
      //Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      'Content-Type': 'application/json',
      'x-api-key': '',
    };
    return config;
  });

  return dataProvider(API_URL, axiosInstance);
};

export const myCustomDataProvider = customDataProvider();
