import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ThemeType} from '../../components/themes/themes';

export interface AppState {
  // Export the interface
  theme: ThemeType;
}

const initialState: AppState = {
  theme: 'light',
};

const mediaSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setPreviewMediaFile: (
      state,
      action: PayloadAction<IMediaFile | undefined>,
    ) => {
      state.previewMedia = action.payload;
    },
    setSelectedMediaFile: (
      state,
      action: PayloadAction<IMediaFile | undefined>,
    ) => {
      state.selectedMedia = action.payload;
    },
  },
});

// Export the action creator
export const MediaActions = mediaSlice.actions;

// Export the reducer to be used in the store
export default mediaSlice.reducer;
