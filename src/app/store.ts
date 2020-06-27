import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';


import counterReducer from '../features/counter/counterSlice';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const rootReducer = () => ({
  counter: counterReducer,
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
