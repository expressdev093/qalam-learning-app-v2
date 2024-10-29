import {axiosInstance} from '@refinedev/nestjsx-crud';
import {dataProvider} from '../nestjsx-crud';

export const TOKEN_KEY = 'najeebmart-admin-key-auth';
export const USER_KEY = 'najeebmart-admin-key-user';

const customDataProvider = () => {
  const API_URL = 'http://192.168.18.59:8080/api/v1'; //"https://api.nestjsx-crud.refine.dev";

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

  return dataProvider(API_URL, axiosInstance);
};

export const myCustomDataProvider = customDataProvider();
