import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IMediaFile, IUser} from '../../typings';

export interface MediaState {
  // Export the interface
  previewMedia?: IMediaFile;
  selectedMedia?: IMediaFile;
}

const initialState: MediaState = {
  previewMedia: undefined,
};

const mediaSlice = createSlice({
  name: 'account',
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
