import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import '../../firebase/index';
import { CreateHabitProps } from '../../templates';
import {
  db,
  FirebaseTimestamp,
  FirebaseFieldValue,
  createRef,
} from '../../firebase/index';
import { ReviewState } from '../../components/HabitDetail';

type HabitProps = {
  id: string;
  name: string;
  startDate: string;
  checkDate: string;
  created_at: any;
  progressCount: number;
  successfulCount: number;
  repeat: number;
  user: {
    uid: string;
    userRef: any;
    username: string;
    level: number;
  };
  reviews: any[];
};

type HabitState = {
  myHabit: HabitProps[];
  habits: HabitProps[];
  isFetching: boolean;
  habitDetail: HabitProps;
};

const initialState: HabitState = {
  myHabit: [],
  habits: [],
  isFetching: true,
  habitDetail: {
    id: '',
    name: '',
    startDate: '',
    checkDate: '',
    created_at: null,
    progressCount: 0,
    successfulCount: 0,
    repeat: 0,
    user: {
      uid: '',
      userRef: null,
      username: '',
      level: 0,
    },
    reviews: [],
  },
};

type State = {
  habitList: HabitProps[];
  uid: string;
};

export const habitsSlice = createSlice({
  name: 'Habit',
  initialState,
  reducers: {
    setMyHabits: (state, action: PayloadAction<any>) => {
      state.isFetching = false;
      state.myHabit = action.payload;
    },
    setHabits: (state, action: PayloadAction<State>) => {
      state.isFetching = false;
      state.habits = action.payload.habitList.filter(
        (item) => item.user.uid !== action.payload.uid
      );
    },
    isFetchingStart: (state) => {
      state.isFetching = true;
    },
    isFetchingFailure: (state) => {
      state.isFetching = false;
    },
    setHabitDetail: (state, action: PayloadAction<HabitProps>) => {
      state.habitDetail = action.payload;
      state.isFetching = false;
      // 最新のレポート順
      state.habitDetail.reviews = state.habitDetail.reviews.sort(
        (a: any, b: any) => {
          if (a.created_at.seconds > b.created_at.seconds) return -1;
          if (a.created_at.seconds < b.created_at.seconds) return 1;
          return 0;
        }
      );
    },
  },
});

export const {
  setMyHabits,
  setHabits,
  isFetchingFailure,
  setHabitDetail,
  isFetchingStart,
} = habitsSlice.actions;

export const fetchMyHabits = (): AppThunk => async (dispatch, getState) => {
  dispatch(isFetchingStart());
  const state = getState();
  const uid = state.users.currentUser.uid;
  try {
    const snapshots = await createRef('users', uid).collection('habits').get();
    if (snapshots.docs.length === 0) return dispatch(isFetchingFailure());
    const habitList: any = [];
    snapshots.forEach((snapshot) => {
      const data = snapshot.data();
      habitList.push(data);
    });
    for (let i = 0; i < habitList.length; i++) {
      const habit = habitList[i];
      const userQuerySnapshot = await habit.user.userRef.get();
      habit.user.username = userQuerySnapshot.data().username;
    }
    return dispatch(setMyHabits(habitList));
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchHabits = (): AppThunk => async (dispatch, getState) => {
  dispatch(isFetchingStart());
  const { users } = getState();
  const { uid } = users.currentUser;
  try {
    const snapshots = await db.collectionGroup('habits').limit(20).get();
    if (snapshots.docs.length === 0) return dispatch(isFetchingFailure());
    const habitList: any = [];
    snapshots.forEach((snapshot) => {
      const data = snapshot.data();
      habitList.push(data);
    });
    for (let i = 0; i < habitList.length; i++) {
      const habit = habitList[i];
      const userQuerySnapshot = await habit.user.userRef.get();
      habit.user.username = userQuerySnapshot.data().username;
      habit.user.level = userQuerySnapshot.data().level;
    }
    return dispatch(setHabits({ habitList, uid }));
  } catch (error) {
    throw new Error(error);
  }
};

export const createHabit = async (data: CreateHabitProps, target?: string) => {
  const batch = db.batch();
  const { uid, name, checkDate, startDate, repeat } = data;
  const userRef = createRef('users', uid);
  const ref = userRef.collection('habits').doc();
  const id = ref.id;
  const habitsRef = userRef.collection('habits').doc(id);
  try {
    batch.set(habitsRef, {
      name,
      checkDate,
      startDate,
      repeat,
      id,
      created_at: FirebaseTimestamp.now(),
      progressCount: 0,
      successfulCount: 0,
      reviews: [],
      user: {
        uid: uid,
        userRef: userRef,
      },
    });
    batch.update(userRef, {
      hasHabit: FirebaseFieldValue.increment(1),
    });
    return await batch.commit().then(() => {
      return '成功';
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchhabitDetail = (
  userId: string,
  habitId: string
): AppThunk => async (dispatch) => {
  if (!userId) return;
  dispatch(isFetchingStart());
  const habitRef = createRef('users', userId).collection('habits').doc(habitId);
  try {
    const snapshot = await habitRef.get();
    console.log(snapshot.data());
    const data = snapshot.data() as any;
    const userQuerySnapshot = await data.user.userRef.get();
    data.user.username = userQuerySnapshot.data().username;
    dispatch(setHabitDetail(data));
  } catch (error) {
    dispatch(isFetchingFailure());
    throw new Error(error);
  }
};

export const createReview = async (
  userId: string,
  habitId: string,
  data: ReviewState
) => {
  if (!userId) return;
  const batch = db.batch();
  const userRef = createRef('users', userId);
  const habitRef = userRef.collection('habits').doc(habitId);
  try {
    let progressIncrement;
    let successfulIncrement;
    const created_at = FirebaseTimestamp.now();
    const { checkDate, progress, note, repeat } = data;
    const points = (repeat: number) => {
      if (repeat === 1) {
        return 1;
      } else if (repeat === 3) {
        return 2;
      } else {
        return 5;
      }
    };
    if (progress === '成功') {
      progressIncrement = FirebaseFieldValue.increment(1);
      successfulIncrement = FirebaseFieldValue.increment(1);
    } else {
      progressIncrement = FirebaseFieldValue.increment(1);
      successfulIncrement = FirebaseFieldValue.increment(0);
    }
    batch.set(
      habitRef,
      {
        checkDate,
        progressCount: progressIncrement,
        successfulCount: successfulIncrement,
        reviews: FirebaseFieldValue.arrayUnion({
          progress,
          note,
          created_at,
        }),
      },
      { merge: true }
    );
    batch.update(userRef, {
      points: FirebaseFieldValue.increment(points(repeat)),
    });
    return await batch.commit().then(() => {
      return '成功';
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteHabit = async (userId: string, habitId: string) => {
  const confirm = window.confirm('Habitを削除しますか？');
  if (confirm) {
    const batch = db.batch();
    const userRef = createRef('users', userId);
    const habitRef = userRef.collection('habits').doc(habitId);
    try {
      batch.delete(habitRef);
      batch.update(userRef, {
        hasHabit: FirebaseFieldValue.increment(-1),
      });
      return await batch.commit();
    } catch (error) {
      throw new Error(error);
    }
  }
};

export const selectHabit = (state: RootState) => state.hibits;

export default habitsSlice.reducer;
