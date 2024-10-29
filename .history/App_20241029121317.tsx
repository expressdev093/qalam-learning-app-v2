import {Refine} from '@refinedev/core';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {myCustomDataProvider} from './src/providers';
import {MainNavigation} from './src/navigations/main';

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
