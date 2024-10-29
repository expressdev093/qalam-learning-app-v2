import {Refine} from '@refinedev/core';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {myCustomDataProvider} from './src/providers';

export const App = () => {
  return (
    <SafeAreaView>
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
        <Text>App</Text>
      </Refine>
    </SafeAreaView>
  );
};
