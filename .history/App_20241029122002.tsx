import {Refine} from '@refinedev/core';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {myCustomDataProvider} from './src/providers';
import {MainNavigation} from './src/navigations/main';
import {IconRegistry} from '@ui-kitten/components';
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

export const App = () => {
  return (
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
        <MainNavigation />
      </Refine>
    </SafeAreaView>
  );
};
