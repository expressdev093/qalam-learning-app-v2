import {IBase} from './base.interface';
import {IUser} from './user.interface';
export interface ILoginDeviceInfo extends IBase {
  firebaseToken: string;

  deviceName: string;

  deviceId: string;

  brand: string;

  ipAddress: string;

  lastLogin: string;

  isCurrentDevice: boolean;

  userId: number;

  user?: IUser;
}
