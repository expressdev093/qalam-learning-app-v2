/* eslint-disable react/react-in-jsx-scope */
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import {useStyleSheet} from '@ui-kitten/components';
import {View, StyleSheet} from 'react-native';
import {TabItem} from './tab-item';

export const MyTabBar: React.FC<MaterialTopTabBarProps> = props => {
  const {state} = props;
  const styles = useStyleSheet(themedStyle);

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => (
        <TabItem route={route} index={index} tabProps={props} key={index} />
      ))}
    </View>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    padding: 4,
  },
});
