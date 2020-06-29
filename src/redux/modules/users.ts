import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import { auth, FirebaseTimestamp, db } from '../../firebase/index';
import { UserModel } from '../../models/model';
import { flashMessage } from './flashMessages';

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

export const usersSlice = createSlice({
  name: 'users',
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
    signInSuccess: (state, action: PayloadAction<CurrentUserProps>) => {
      state.currentUser = action.payload;
      state.isLogined = true;
    },
  },
});

export const { setCurrentUser, signInSuccess } = usersSlice.actions;

export const signIn = (email: string, password: string): AppThunk => async (
  dispatch
) => {
  return auth.signInWithEmailAndPassword(email, password).then((result) => {
    const user = result.user;
    if (!user) {
      throw new Error('ユーザーIDを取得できません');
    }

    const uid = user.uid;
    db.collection('users')
      .doc(uid)
      .get()
      .then((snapshot) => {
        const data = snapshot.data() as CurrentUserProps;
        dispatch(signInSuccess(data));
      }).then(() => {
        dispatch(flashMessage('サインインしました'))
      })
  }).catch(() => {
    throw new Error('サインインに失敗しました。');
  })
};

export const signUp = (
  username: string,
  email: string,
  password: string
): AppThunk => async (dispatch) => {
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      const user = result.user;
      if (user) {
        const uid = user.uid;
        const timestamp = FirebaseTimestamp.now();
        const userInitialDate: UserModel = {
          username: username,
          email: email,
          uid: uid,
          created_at: timestamp,
          updated_at: timestamp,
          hasHabit: 0,
          maxHabit: 1,
          likeHabitCount: 0,
        };
        db.collection('users')
          .doc(uid)
          .set(userInitialDate)
          .then(async () => {
            dispatch(flashMessage('アカウント登録が成功しました'));
          });
      }
    })
    .catch((error) => {
      throw new Error('アカウント登録に失敗しました。もう1度お試しください。');
    });
};

export const selectUser = (state: RootState) => state.users;

export default usersSlice.reducer;
