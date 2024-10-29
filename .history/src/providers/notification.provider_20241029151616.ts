import {NotificationProvider, OpenNotificationParams} from '@refinedev/core';

export const notificationProvider: NotificationProvider = {
  open: (params: OpenNotificationParams) => {
    console.log(params);
  },
  close: () => {},
};
