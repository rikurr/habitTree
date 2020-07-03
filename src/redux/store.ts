import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';

import { userReducer, flashMessagesReducer, habitReducer } from './modules';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
  immutableCheck: false,
});

const rootReducer = () => ({
  users: userReducer,
  flashMessages: flashMessagesReducer,
  hibits: habitReducer,
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
