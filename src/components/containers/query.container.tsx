import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query/react';
import {SerializedError} from '@reduxjs/toolkit';
import {Spinner} from '@ui-kitten/components';
import {MessageView, MessageViewProps} from '../empty';
import {emptyImage, wifiImage} from '../svgs';
import {HttpError} from '@refinedev/core';

type Props = PropsWithChildren & {
  isLoading: boolean;
  isError: boolean;
  error: HttpError | null | undefined;
  isEmpty?: boolean;
  errorViewProps?: MessageViewProps;
  networkViewProps?: MessageViewProps;
  emptyViewProps?: MessageViewProps;
};

export const QueryContainer: React.FC<Props> = ({
  children,
  isLoading,
  isError,
  error,
  isEmpty,
  emptyViewProps,
  errorViewProps,
  networkViewProps,
}) => {
  const netInfo = useNetInfo();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
        }}>
        <Spinner size="giant" />
      </View>
    );
  }

  if (isError) {
    return (
      <MessageView
        description={error?.toString() ?? 'Network request rejected'}
        imageSource={emptyImage}
        {...errorViewProps}
      />
    );
  }

  if (isEmpty) {
    if (netInfo.type === 'none' || netInfo.type === 'unknown') {
      return (
        <MessageView
          title="No Internet Connections"
          description="Please check your internet connection and try again."
          imageSource={wifiImage}
          {...networkViewProps}
        />
      );
    } else {
      return (
        <MessageView
          title="Oh Crap, You've got nothing."
          imageSource={emptyImage}
          {...emptyViewProps}
        />
      );
    }
  }

  return <>{children}</>;
};
