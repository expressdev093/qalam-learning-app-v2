import {axiosInstance} from '@refinedev/nestjsx-crud';
import {dataProvider} from '../nestjsx-crud';
import {API_URL} from '@env';
import Config from 'react-native-config';

export const TOKEN_KEY = 'qalam-learning-app-key-auth';
export const USER_KEY = 'qalam-learning-app-key-user';

const customDataProvider = () => {
  axiosInstance.interceptors.request.use((config: any) => {
    config.headers = {
      ...config.headers, // Change config.header to config.headers
      //Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      'Content-Type': 'application/json',
      'x-api-key':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYWNrYWdlTmFtZSI6ImNvbS5uYWplZWIubWFydC5waGFybWFjeS5zaG9wcGluZy5vbmxpbmUuZnJlZS5kZWxpdmVyeS5ncm9jZXJ5IiwiaWF0IjoxNjAxNDYyNDYyfQ.J_UBlexExMk65-4d8kEL6uKL5Ka9FP3i6aU1WkWS2JQ',
    };
    return config;
  });

  return dataProvider(Config.API_URL || API_URL, axiosInstance);
};

export const myCustomDataProvider = customDataProvider();
