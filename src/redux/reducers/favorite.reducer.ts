import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ITopicVideo, ITopicVideosView, IUser} from '../../interfaces';

export interface FavoriteState {
  isFavoriteLoaded: boolean;
  topicVideoViews: ITopicVideosView[];
}

const initialState: FavoriteState = {
  isFavoriteLoaded: false,
  topicVideoViews: [],
};

const favoriteSlice = createSlice({
  name: 'favorites-topic-videos',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<ITopicVideosView>) => {
      const isNotExist =
        state.topicVideoViews.find(item => item.id === action.payload.id) ===
        undefined;
      if (isNotExist) {
        state.isFavoriteLoaded = false;
        state.topicVideoViews = [action.payload, ...state.topicVideoViews];
      }
    },
    addList: (state, action: PayloadAction<ITopicVideosView[]>) => {
      state.isFavoriteLoaded = true;
      state.topicVideoViews = action.payload;
    },
    remove: (state, action: PayloadAction<number>) => {
      state.isFavoriteLoaded = false;
      state.topicVideoViews = state.topicVideoViews.filter(
        v => v.id !== action.payload,
      );
    },
    reset: state => {
      state.isFavoriteLoaded = false;
      state.topicVideoViews = [];
    },
  },
});

// Export the action creator
export const FavoriteActions = favoriteSlice.actions;

// Export the reducer to be used in the store
export default favoriteSlice.reducer;
