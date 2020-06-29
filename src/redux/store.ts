import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';

import { userReducer } from './modules';
import counterReducer from '../features/counter/counterSlice';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const rootReducer = () => ({
  counter: counterReducer,
  users: userReducer,
});

const middleware = [...customizedMiddleware];

export const store = configureStore({
  reducer: rootReducer(),
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
