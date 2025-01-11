import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IFavoriteVideo} from '../../interfaces';

export interface FavoriteState {
  isFavoriteLoaded: boolean;
  favoriteVideos: IFavoriteVideo[];
}

const initialState: FavoriteState = {
  isFavoriteLoaded: false,
  favoriteVideos: [],
};

const favoriteSlice = createSlice({
  name: 'favorites-videos',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<IFavoriteVideo>) => {
      const isNotExist =
        state.favoriteVideos.find(item => item.id === action.payload.id) ===
        undefined;
      if (isNotExist) {
        state.isFavoriteLoaded = false;
        state.favoriteVideos = [action.payload, ...state.favoriteVideos];
      }
    },
    addList: (state, action: PayloadAction<IFavoriteVideo[]>) => {
      state.isFavoriteLoaded = true;
      state.favoriteVideos = action.payload;
    },
    remove: (state, action: PayloadAction<number>) => {
      state.isFavoriteLoaded = false;
      state.favoriteVideos = state.favoriteVideos.filter(
        v => v.id !== action.payload,
      );
    },
    reset: state => {
      state.isFavoriteLoaded = false;
      state.favoriteVideos = [];
    },
  },
});

// Export the action creator
export const FavoriteActions = favoriteSlice.actions;

// Export the reducer to be used in the store
export default favoriteSlice.reducer;
