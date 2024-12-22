import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import {useStyleSheet} from '@ui-kitten/components';
import {View, StyleSheet} from 'react-native';
import {TabItem} from './tab-item';
import {ScrollView} from 'react-native-gesture-handler';

export const MyTabBar: React.FC<MaterialTopTabBarProps> = props => {
  const {state} = props;
  const styles = useStyleSheet(themedStyle);

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container} horizontal>
        {state.routes.map((route, index) => (
          <TabItem route={route} index={index} tabProps={props} />
        ))}
      </ScrollView>
    </View>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    padding: 4,
  },
});
