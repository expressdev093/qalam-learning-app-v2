import {ReactNode} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Themes} from './themes';
import {ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {default as mapping} from './../../../mapping.json';
import {useAppSelector} from '../../redux/store';
import React from 'react';

export const AppThemeProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const userSelectedThemeType = useAppSelector(state => state.app.theme);
  const systemThemeType = useColorScheme();
  const themeType =
    userSelectedThemeType === 'system' && systemThemeType
      ? systemThemeType
      : userSelectedThemeType;
  const theme = Themes[themeType];

  // console.log(JSON.stringify(theme, null, 2))

  return (
    <ApplicationProvider {...eva} theme={theme} customMapping={mapping as any}>
      {children}
    </ApplicationProvider>
  );
};
