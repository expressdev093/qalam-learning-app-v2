import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser} from '../../interfaces';

export interface AuthState {
  // Export the interface
  user?: IUser;
  isLoggedIn: boolean;
  token?: string;
}

export interface IAuthPayload {
  user?: IUser;
  token?: string;
}

const initialState: AuthState = {
  user: undefined,
  token: undefined,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    loggedIn: (state, action: PayloadAction<IAuthPayload | undefined>) => {
      state.user = action.payload?.user;
      state.isLoggedIn = true;
      state.token = action.payload?.token;
    },
    logout: state => {
      state.isLoggedIn = false;
      state.user = undefined;
      state.token = undefined;
    },
  },
});

// Export the action creator
export const AuthActions = authSlice.actions;

// Export the reducer to be used in the store
export default authSlice.reducer;
