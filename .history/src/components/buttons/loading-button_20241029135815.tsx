import {Button, ButtonProps, Spinner} from '@ui-kitten/components';
import React, {PropsWithChildren} from 'react';
import {ActivityIndicator} from 'react-native';
import { COMMON_STYLES } from '../../themes/common-styles';

type IButtonProps = ButtonProps & {
  isSubmitting?: boolean;
  text?: string;
  loading?: boolean;
  color?: string;
};

const LoadingButton: React.FC<PropsWithChildren<IButtonProps>> = ({
  children,
  isSubmitting,
  loading,
  color,
  text,
  style,
  ...buttonProps
}) => {
  const disabled = loading || isSubmitting;
  const onLoading = (props: any) => (
    <Spinner status={disabled ? 'primary' : 'basic'} />
  );
  return (
    <Button
      disabled={disabled}
      {...buttonProps}
      style={[COMMON_STYLES.BUTTON_STYLE, style]}
      accessoryLeft={loading ? onLoading : undefined}>
      {children ?? text}
    </Button>
  );
};

LoadingButton.defaultProps = {
  loading: false,
  color: '#fff',
  isSubmitting: false,
};

export default LoadingButton;