import {Text, useTheme} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import reactotron from 'reactotron-react-native';

type AlertVariant = 'primary' | 'success' | 'danger' | 'warning' | 'info';

const addOpacityToHexColor = (hexColor: string, opacity: number): string => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const getTextColorForBackgroundColor = (backgroundColor: string): string => {
  const color = backgroundColor.substring(
    backgroundColor.indexOf('(') + 1,
    backgroundColor.lastIndexOf(')'),
  );
  const colorArray = color.split(',');
  const r = parseInt(colorArray[0]);
  const g = parseInt(colorArray[1]);
  const b = parseInt(colorArray[2]);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'black' : 'white';
};

interface IProps {
  visible: boolean;
  message?: string;
  title?: string;
  variant?: AlertVariant;
  closeable?: boolean;
  onClose?: () => void;
}

export const Alert: React.FC<IProps> = ({
  visible,
  message,
  title,
  variant = 'primary',
  closeable,
  onClose,
}) => {
  const theme = useTheme();

  reactotron.log?.(theme);
  const varaintColor = theme['color-' + variant + '-500'];
  reactotron.log?.(varaintColor);
  const backgroundColor = addOpacityToHexColor(varaintColor, 0.5);
  const iconColor = addOpacityToHexColor(varaintColor, 0.9);
  const textColor = getTextColorForBackgroundColor(backgroundColor);
  const styles = createStyles(textColor, backgroundColor);

  const animation = visible && variant === 'danger' ? 'shake' : 'fadeIn';

  return (
    <Animatable.View
      animation={animation}
      duration={500}
      style={[
        styles.container,
        {display: visible ? 'flex' : 'none', marginBottom: visible ? 10 : 0},
      ]}>
      <View style={styles.content}>
        {title && (
          <Text style={styles.title} category="s1">
            {title}
          </Text>
        )}
        <Text style={styles.message} category="p2">
          {message}
        </Text>
      </View>
      {closeable && (
        <TouchableOpacity onPress={onClose}>
          <MaterialCommunityIcons
            name="close-circle"
            size={24}
            color={textColor}
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const createStyles = (textColor: string, backgroundColor: string) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: backgroundColor,
      backgroundColor: backgroundColor,
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingRight: 10,
    },
    content: {
      padding: 10,
    },
    title: {
      color: textColor,
    },
    message: {
      color: textColor,
    },
  });
