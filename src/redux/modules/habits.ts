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
  };
  reports: any[];
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
    },
    reports: [],
  },
};

export const habitsSlice = createSlice({
  name: 'Habit',
  initialState,
  reducers: {
    setMyHabits: (state, action: PayloadAction<any>) => {
      state.isFetching = false;
      state.myHabit = action.payload;
    },
    setActivities: (state, action: PayloadAction<any>) => {
      state.habits = action.payload;
      state.isFetching = false;
    },
    isFetchingStart: (state) => {
      state.isFetching = true;
    },
    isFetchingFailure: (state) => {
      state.isFetching = false;
    },
    sethabitDetail: (state, action: PayloadAction<any>) => {
      state.habitDetail = action.payload;
      state.isFetching = false;
      // 最新のレポート順
      state.habitDetail.reports = state.habitDetail?.reports.sort(
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
  setActivities,
  isFetchingFailure,
  sethabitDetail,
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
    console.log('error');
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
      reports: [],
      user: {
        uid: uid,
        userRef: userRef,
      },
    });
    if (target) {
      batch.update(userRef, {
        hasHabit: FirebaseFieldValue.increment(1),
        target: target,
      });
    } else {
      batch.update(userRef, {
        hasHabit: FirebaseFieldValue.increment(1),
      });
    }
    return await batch.commit().then(() => {
      return '成功';
    });
  } catch (error) {
    throw new Error(error);
  }
};

// export const fetchActivities = (uid: string): AppThunk => (dispatch) => {
//   const fetch = async () => {
//     try {
//       const data = await getActivities(uid);
//       if (!data) return dispatch(isFetchingFailure());
//       console.log(data);
//       dispatch(setActivities(data));
//     } catch (error) {
//       console.log('error');
//       dispatch(isFetchingFailure());
//     }
//   };
//   fetch();
// };

// export const fetchhabitDetail = (
//   usrId: string,
//   progressId: string
// ): AppThunk => (dispatch) => {
//   if (!usrId) return;
//   dispatch(isFetchingStart());
//   const fetch = async () => {
//     try {
//       const data = await getProgress(usrId, progressId);
//       console.log(data);
//       dispatch(sethabitDetail(data));
//     } catch (error) {
//       console.log('error fetch my active');
//       dispatch(isFetchingFailure());
//     }
//   };
//   fetch();
// };

export const selectHabit = (state: RootState) => state.hibits;

export default habitsSlice.reducer;
