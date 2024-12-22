import {Button, ButtonProps, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

export type MessageViewProps = {
  title?: string;
  description?: string;
  imageSource: any;
  buttonText?: string;
} & ButtonProps;

export const MessageView: React.FC<MessageViewProps> = ({
  title,
  description,
  imageSource,
  buttonText,
  onPress,
  ...restButtonProps
}: MessageViewProps) => {
  const styles = useStyleSheet(themedStyle);
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image as any} />
      {title && <Text style={styles.title}>{title}</Text>}
      {description && <Text style={styles.description}>{description}</Text>}
      {buttonText && onPress && (
        <Button onPress={onPress} {...restButtonProps}>
          {buttonText}
        </Button>
      )}
    </View>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    width: '80%',
    textAlign: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
