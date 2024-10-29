import {Refine} from '@refinedev/core';
import React, {Fragment} from 'react';
import {SafeAreaView} from 'react-native';
import {myCustomDataProvider} from './src/providers';
import {MainNavigation} from './src/navigations/main';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry, Layout} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {
  AntDesignIconsPack,
  AssetIconsPack,
  EntypoIconsPack,
  EvilIconsPack,
  FeatherIconsPack,
  FontAwesome5IconsPack,
  FontAwesomeIconsPack,
  FontistoIconsPack,
  FoundationIconsPack,
  IonIconsPack,
  MaterialCommunityIconsPack,
  MaterialIconsPack,
  OctiIconsPack,
  SimpleLineIconsPack,
  ZocialIconsPack,
} from './src/components/icons';
import {AppThemeProvider} from './src/components/themes';
import {StoreProvider} from './src/redux';
import {SafeAreaProviderCompat} from '@react-navigation/elements';

export const App = () => {
  return (
    <StoreProvider>
      <SafeAreaView style={{flex: 1}}>
        <Refine
          dataProvider={myCustomDataProvider}
          //authProvider={authProvider}
          resources={[
            {
              name: 'users',
              list: '/users',
              create: '/users/create',
              edit: '/users/edit/:id',
              show: '/users/show/:id',
              meta: {
                canDelete: true,
                label: 'Users',
              },
            },
          ]}>
          <Fragment>
            <IconRegistry
              icons={[
                EvaIconsPack,
                AntDesignIconsPack,
                EntypoIconsPack,
                EvilIconsPack,
                FeatherIconsPack,
                FontAwesomeIconsPack,
                FontAwesome5IconsPack,
                FontistoIconsPack,
                FoundationIconsPack,
                IonIconsPack,
                MaterialCommunityIconsPack,
                MaterialIconsPack,
                OctiIconsPack,
                SimpleLineIconsPack,
                ZocialIconsPack,
                AssetIconsPack,
              ]}
            />
            <AppThemeProvider>
              <SafeAreaProviderCompat>
                <MainNavigation />
              </SafeAreaProviderCompat>
            </AppThemeProvider>
          </Fragment>
        </Refine>
      </SafeAreaView>
    </StoreProvider>
  );
};
