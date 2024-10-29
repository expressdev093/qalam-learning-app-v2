import React from 'react';

export const RootStack = () => {
  return (
    <React.Fragment>
      <FocusAwareStatusBar
        barStyle={'dark-content'}
        backgroundColor={'#F8F6F4'}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
        initialRouteName={RouteNames.homeStack}>
        <Stack.Screen name={RouteNames.authStack} component={AuthStack} />
        <Stack.Screen name={RouteNames.homeStack} component={HomeStack} />
      </Stack.Navigator>
    </React.Fragment>
  );
};
