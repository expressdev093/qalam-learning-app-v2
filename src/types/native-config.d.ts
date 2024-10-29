declare module 'react-native-config' {
  export interface NativeConfig {
    BASE_URL?: string;
    COMPANY_EMAIL?: string;
    API_KEY?: string;
    API_URL?: string;
    TYPE?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
