import * as eva from '@eva-design/eva';
import {StatusBarStyle} from 'react-native';
import {customMapping} from './custom-mapping';
import {Colors} from '../../constants/colors';

export const LightTheme = {
  ...eva.light,

  'color-primary-100': '#DDDCFE',
  'color-primary-200': '#BCB9FE',
  'color-primary-300': '#9A96FD',
  'color-primary-400': '#807CFB',
  'color-primary-500': '#5651F9',
  'color-primary-600': '#3F3BD6',
  'color-primary-700': '#2C28B3',
  'color-primary-800': '#1C1990',
  'color-primary-900': '#110F77',
  'color-success-100': '#F4FDCF',
  'color-success-200': '#E6FCA0',
  'color-success-300': '#D1F76F',
  'color-success-400': '#BCEF4B',
  'color-success-500': '#9CE514',
  'color-success-600': '#7EC40E',
  'color-success-700': '#63A40A',
  'color-success-800': '#4B8406',
  'color-success-900': '#396D03',
  'color-info-100': '#D6F4FE',
  'color-info-200': '#ADE6FE',
  'color-info-300': '#84D3FD',
  'color-info-400': '#65BFFB',
  'color-info-500': '#339FFA',
  'color-info-600': '#257CD7',
  'color-info-700': '#195CB3',
  'color-info-800': '#104190',
  'color-info-900': '#092D77',
  'color-warning-100': '#FFF9D1',
  'color-warning-200': '#FFF1A3',
  'color-warning-300': '#FFE775',
  'color-warning-400': '#FFDD52',
  'color-warning-500': '#FFCD19',
  'color-warning-600': '#DBAB12',
  'color-warning-700': '#B78A0C',
  'color-warning-800': '#936C07',
  'color-warning-900': '#7A5604',
  'color-danger-100': '#FFEBD5',
  'color-danger-200': '#FFD2AC',
  'color-danger-300': '#FFB382',
  'color-danger-400': '#FF9563',
  'color-danger-500': '#FF6430',
  'color-danger-600': '#DB4423',
  'color-danger-700': '#B72918',
  'color-danger-800': '#93140F',
  'color-danger-900': '#7A090C',
  'color-basic-200': '#F8F6F4',
  'background-basic-color-1': Colors.basicBackgroundColor1,
  'color-primary-2': Colors.primary2,
  'color-secondary': Colors.secondary,
  'color-secondary-2': Colors.secondary2,
  'color-secondary-3': Colors.secondary3,
  'color-white': Colors.white,
  'linear-gradient-start': Colors.linearGradientStart,
  'linear-gradient-end': Colors.linearGradientEnd,
  'color-strok-gray': Colors.grayStroke,
  'color-gray': Colors.gray,
  'color-gray-icon': Colors.grayIcon,

  barStyle: 'dark-content' as StatusBarStyle,
  //...customMapping,
};

export const DefaultTheme = LightTheme;

export const DarkTheme = {
  ...eva.dark,
  barStyle: 'light-content' as StatusBarStyle,
};

export type ThemeType = 'light' | 'dark' | 'system';

export const Themes: Record<ThemeType, typeof DefaultTheme> = {
  light: LightTheme,
  dark: DarkTheme,
  system: DefaultTheme,
};
