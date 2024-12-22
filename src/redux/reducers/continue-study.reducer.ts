import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ITopicVideo, IUser} from '../../interfaces';

export interface ContinueStudyState {
  isTopicVideoLoaded: boolean;
  topicVideos: ITopicVideo[];
}

const initialState: ContinueStudyState = {
  isTopicVideoLoaded: false,
  topicVideos: [],
};

const continueStudySlice = createSlice({
  name: 'continue-study',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<ITopicVideo>) => {
      const isNotExist =
        state.topicVideos.find(item => item.id === action.payload.id) ===
        undefined;
      if (isNotExist) {
        state.isTopicVideoLoaded = false;
        state.topicVideos = [action.payload, ...state.topicVideos];
      }
    },
    addList: (state, action: PayloadAction<ITopicVideo[]>) => {
      state.isTopicVideoLoaded = true;
      state.topicVideos = action.payload;
    },
    remove: (state, action: PayloadAction<number>) => {
      state.isTopicVideoLoaded = false;
      state.topicVideos = state.topicVideos.filter(
        v => v.id !== action.payload,
      );
    },
    reset: state => {
      state.isTopicVideoLoaded = false;
      state.topicVideos = [];
    },
  },
});

// Export the action creator
export const ContineuStudyActions = continueStudySlice.actions;

// Export the reducer to be used in the store
export default continueStudySlice.reducer;
