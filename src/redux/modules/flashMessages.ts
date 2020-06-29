import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type FlshMessages = {
  messages: string[];
};

const initialState: FlshMessages = {
  messages: [],
};

export const flshMessagesSlice = createSlice({
  name: 'flshMessages',
  initialState,
  reducers: {
    flashMessage: (state, action: PayloadAction<string>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { flashMessage } = flshMessagesSlice.actions;

export const selectFlashMessage = (state: RootState) =>
  state.flashMessages.messages;

export default flshMessagesSlice.reducer;
