import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Refine>
    </SafeAreaView>
  );
};
