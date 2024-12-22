/* eslint-disable react/react-in-jsx-scope */
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import {Text, useStyleSheet} from '@ui-kitten/components';
import {StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../../../constants/colors';

export const TabItem: React.FC<{
  route: any;
  index: number;
  tabProps: MaterialTopTabBarProps;
}> = ({route, index, tabProps: {descriptors, state, navigation, position}}) => {
  const styles = useStyleSheet(themedStyle);
  const {options} = descriptors[route.key];
  const label =
    options.tabBarLabel !== undefined
      ? options.tabBarLabel
      : options.title !== undefined
      ? options.title
      : route.name;

  const isFocused = state.index === index;

  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      // The `merge: true` option makes sure that the params inside the tab screen are preserved
      navigation.navigate(route.name, {
        merge: true,
      });
    }
  };

  const onLongPress = () => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    });
  };

  return (
    <LinearGradient
      useAngle
      angle={90}
      colors={isFocused ? Colors.gradientSecondaryColors : ['#fff', '#fff']}
      style={styles.tabItem}>
      <TouchableOpacity
        key={index}
        accessibilityRole="button"
        accessibilityState={isFocused ? {selected: true} : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        // testID={options.tabBarTestID}
        onPress={onPress}
        onLongPress={onLongPress}
        style={[styles.tabItem]}>
        <Text style={isFocused ? styles.textActive : styles.textDefault}>
          {label}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const themedStyle = StyleSheet.create({
  tabItem: {
    height: 45,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  default: {
    backgroundColor: 'white',
  },
  textActive: {
    color: 'white',
  },
  textDefault: {
    color: '#000',
  },
});
