import React, {Fragment, PropsWithChildren} from 'react';
import {IIconProps, Icon} from '../icon';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, useStyleSheet} from '@ui-kitten/components';

type IProps = PropsWithChildren &
  IIconProps & {
    isActive?: boolean;
    text?: string | number;
    backgroundColor?: string;
    onPress?: () => void;
  };

export const VideoStateButton: React.FC<IProps> = ({
  children,
  isActive = false,
  text,
  backgroundColor,
  onPress,
  ...iconProps
}) => {
  const styles = useStyleSheet(themedStyle);

  const renderContent = (
    <Fragment>
      <Icon
        size={18}
        {...iconProps}
        color={isActive ? iconProps.color ?? 'white' : '#000'}
      />
      <Text style={[styles.text, isActive && styles.white]}>{text}</Text>
    </Fragment>
  );

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.container, isActive && styles.active]}>
      {renderContent}
    </TouchableOpacity>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  active: {
    backgroundColor: 'color-primary-500',
  },
  text: {
    marginLeft: 5,
  },
  white: {
    color: '#fff',
  },
});
