import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import { auth } from '../../firebase/index';
import { isValidRequiredInput, isValidEmailFormat } from '../../utils/validates';

type CurrentUserProps = {
  id: string;
  username: string;
  email: string;
  created_at: any;
  updated_at: any;
  hasActivity: number;
  maxActivity: number;
  likeActivityCount: number;
};

type UserState = {
  isLogined: boolean;
  isFetching: boolean;
  currentUser: CurrentUserProps;
};

const initialState: UserState = {
  isLogined: false,
  isFetching: true,
  currentUser: {
    id: '',
    username: '',
    email: '',
    created_at: null,
    updated_at: null,
    hasActivity: 0,
    maxActivity: 1,
    likeActivityCount: 0,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
      state.isFetching = false;
      if (action.payload) {
        state.isLogined = true;
      } else {
        state.isLogined = false;
      }
    },
  },
});

export const { setCurrentUser } = userSlice.actions;



export const selectUser = (state: RootState) => state.users;

export default userSlice.reducer;
