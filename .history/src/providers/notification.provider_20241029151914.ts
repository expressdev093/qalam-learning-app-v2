import {NotificationProvider, OpenNotificationParams} from '@refinedev/core';

export const notificationProvider: NotificationProvider = {
  open: (params: OpenNotificationParams) => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋',
    });
  },
  close: () => {},
};
