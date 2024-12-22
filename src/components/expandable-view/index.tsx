import React, {Fragment, PropsWithChildren, useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  LayoutAnimation,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {Icon} from '../icon';
import {Text, useStyleSheet} from '@ui-kitten/components';
// You need to install a suitable icon library

type ExpandableViewProps = PropsWithChildren & {
  title: string;
  contentStyle?: ViewStyle;
  isExpanded?: boolean;
};

export const ExpandableView: React.FC<ExpandableViewProps> = ({
  title,
  children,
  contentStyle,
  isExpanded,
}) => {
  const styles = useStyleSheet(themedStyle);
  const [expanded, setExpanded] = useState(isExpanded);

  const toggleExpansion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={toggleExpansion}
        style={styles.headerContainer}>
        <Text category="s2" style={{flex: 1, marginRight: 5}}>
          {title}
        </Text>
        <Icon
          name={expanded ? 'chevron-down' : 'chevron-up'}
          size={20}
          pack="entypo"
        />
      </TouchableOpacity>
      {expanded && <View style={styles.divider} />}
      {expanded && (
        <View style={[styles.content, contentStyle]}>{children}</View>
      )}
    </View>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    width: '100%',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0.5},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // For Android shadow
    marginBottom: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
  },
  content: {
    backgroundColor: 'white',
    padding: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#dedede',
  },
});
