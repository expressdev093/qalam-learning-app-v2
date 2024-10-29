import {ReactNode} from 'react';
import {useSelector} from 'react-redux';
import {themeTypeSelector} from '../modules/app/selectors';
import {StatusBar, useColorScheme} from 'react-native';
import {Themes} from './themes';
import {ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {default as mapping} from './../../mapping.json';
import {FocusAwareStatusBar} from '../components';

const AppThemeProvider = ({children}: {children: ReactNode | ReactNode[]}) => {
  const userSelectedThemeType = useSelector(themeTypeSelector);
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

export default AppThemeProvider;
