import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ThemeType} from '../../components/themes/themes';

export interface AppState {
  // Export the interface
  theme: ThemeType;
}

const initialState: AppState = {
  theme: 'light',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
    },
  },
});

// Export the action creator
export const AppActions = appSlice.actions;

// Export the reducer to be used in the store
export default appSlice.reducer;
