import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import {
  auth,
  FirebaseTimestamp,
  db,
  createRef,
  FirebaseFieldValue,
} from '../../firebase/index';
import { flashMessage } from './flashMessages';
import { setInitialState } from './habits';

const usersRef = db.collection('users');

export type CurrentUserProps = {
  uid: string;
  username: string;
  email: string;
  created_at: any;
  updated_at: any;
  hasHabit: number;
  likeHabitCount: number;
  points: number;
  level: number;
};

type UserState = {
  isSignedIn: boolean;
  isFetching: boolean;
  usersFetching: boolean;
  userFetching: boolean;
  userList: CurrentUserProps[];
  currentUser: CurrentUserProps;
  user: CurrentUserProps;
};

const initialState: UserState = {
  isSignedIn: false,
  isFetching: true,
  usersFetching: true,
  userFetching: true,
  userList: [],
  currentUser: {
    uid: '',
    username: '',
    email: '',
    created_at: null,
    updated_at: null,
    hasHabit: 0,
    likeHabitCount: 0,
    points: 0,
    level: 0,
  },
  user: {
    uid: '',
    username: '',
    email: '',
    created_at: null,
    updated_at: null,
    hasHabit: 0,
    likeHabitCount: 0,
    points: 0,
    level: 0,
  },
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<CurrentUserProps>) => {
      state.currentUser = action.payload;
      state.isFetching = false;
      if (action.payload) {
        state.isSignedIn = true;
      } else {
        state.isSignedIn = false;
      }
    },
    signInSuccess: (state, action: PayloadAction<CurrentUserProps>) => {
      if (action.payload) {
        state.currentUser = action.payload;
      }
      state.isSignedIn = true;
      state.isFetching = false;
    },
    signInFailure: (state) => {
      state.isFetching = false;
    },
    signOutSuccess: (state, action: PayloadAction<CurrentUserProps>) => {
      state.isSignedIn = false;
      state.currentUser = action.payload;
    },
    fetchUsersSuccess: (state, action) => {
      state.userList = action.payload;
      state.usersFetching = false;
    },
    fetchUserStart: (state) => {
      state.userFetching = true;
    },
    fetchUserSuccess: (state, action) => {
      state.user = action.payload;
      state.userFetching = false;
    },
  },
});

export const {
  setCurrentUser,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  fetchUserStart,
  fetchUsersSuccess,
  fetchUserSuccess,
} = usersSlice.actions;

const createUserDocument = async (user: any, addData?: any) => {
  const uid = user.uid;
  const userRef = usersRef.doc(uid);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { email, displayName } = user;
    const timestamp = FirebaseTimestamp.now();
    const userInitialDate = {
      username: displayName,
      email: email,
      uid: uid,
      created_at: timestamp,
      updated_at: timestamp,
      hasHabit: 0,
      likeHabitCount: 0,
      points: 0,
      level: 1,
      ...addData,
    };
    await userRef.set(userInitialDate);
  }
  return userRef;
};

export const listenAuth = (): AppThunk => async (dispatch) => {
  return auth.onAuthStateChanged(async (user) => {
    if (user) {
      if (user.displayName) {
        await createUserDocument(user);
      }
      const uid = user.uid;
      usersRef.doc(uid).onSnapshot((doc) => {
        const data = doc.data() as CurrentUserProps;
        dispatch(signInSuccess(data));
      });
    } else {
      dispatch(signInFailure());
    }
  });
};

export const signIn = async (email: string, password: string) => {
  return auth
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      const user = result.user;
      if (!user) {
        throw new Error('ユーザーIDを取得できません');
      }
    })
    .catch(() => {
      throw new Error('サインインに失敗しました。');
    });
};

export const signUp = async (
  username: string,
  email: string,
  password: string
) => {
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then(async (result) => {
      const user = result.user;
      if (user) {
        await user?.updateProfile({
          displayName: username,
        });
        return await createUserDocument(user, { username });
      }
    })
    .catch(() => {
      throw new Error('アカウント登録に失敗しました。もう1度お試しください。');
    });
};

export const signOut = (): AppThunk => async (dispatch) => {
  const userInitialState = {
    uid: '',
    username: '',
    email: '',
    created_at: null,
    updated_at: null,
    hasHabit: 0,
    likeHabitCount: 0,
    points: 0,
    level: 0,
  };
  const habit: any = [];
  auth.signOut().then(() => {
    dispatch(signOutSuccess(userInitialState));
    dispatch(setInitialState(habit));
  });
};

export const levelUp = (): AppThunk => async (dispatch, getState) => {
  const { users } = getState();
  const userRef = createRef('users', users.currentUser.uid);
  try {
    userRef
      .set(
        {
          level: FirebaseFieldValue.increment(1),
        },
        { merge: true }
      )
      .then(() => {
        dispatch(
          flashMessage(`レベルが上がりました!Habitをメニューから作成できます。`)
        );
      });
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchUsers = (): AppThunk => async (dispatch) => {
  try {
    const snapshots = await usersRef.limit(20).orderBy('level', 'desc').get();
    const userList: any = [];
    snapshots.forEach((snapshot) => {
      const data = snapshot.data();
      userList.push(data);
    });
    dispatch(fetchUsersSuccess(userList));
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchUser = (uid: string): AppThunk => async (dispatch) => {
  dispatch(fetchUserStart());
  try {
    usersRef.doc(uid).onSnapshot((doc) => {
      const data = doc.data() as CurrentUserProps;
      dispatch(fetchUserSuccess(data));
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const selectUser = (state: RootState) => state.users;

export default usersSlice.reducer;
