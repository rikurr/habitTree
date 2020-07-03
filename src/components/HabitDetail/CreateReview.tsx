import React, { ChangeEvent } from 'react';
import { Page, CustomButton, TextInput, MarginTop } from '../UIkit';
import {
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useImmerReducer } from 'use-immer';
import { useParams, useHistory } from 'react-router-dom';
import { selectHabit, createReview } from '../../redux/modules/habits';
import { getDate } from '../../utils/dateFormat';
import { flashMessage } from '../../redux/modules/flashMessages';

export type ReviewState = {
  progress: string;
  note: string;
  checkDate: string;
  repeat: number;
};

const CreateReview = () => {
  const { habitId, userId } = useParams();
  const history = useHistory();
  const habit = useSelector(selectHabit);
  const dispatch = useDispatch();

  const initialState: ReviewState = {
    progress: '',
    note: '',
    checkDate: getDate(habit.habitDetail.repeat),
    repeat: habit.habitDetail.repeat,
  };

  const reducer = (draft: ReviewState, action: any) => {
    switch (action.type) {
      case 'successfulChange':
        draft.progress = action.payload;
        return;
      case 'noteChange':
        draft.note = action.payload;
        return;
    }
  };

  const [state, immerDispatch] = useImmerReducer(reducer, initialState);

  const handleSubmit = () => {
    if (state.note.trim() === '' || state.progress.trim() === '')
      return alert('入力が完了されていません');
    try {
      createReview(userId, habitId, state).then((res) => {
        if (res === '成功') {
          history.push(`/`);
          dispatch(flashMessage('レビューを作成しました'));
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <Page title='create-report'>
      <Typography variant='h2'>Review the day</Typography>
      <MarginTop mt={4} />
      <Typography variant='h3'>{habit.habitDetail.name}</Typography>
      <MarginTop mt={4} />
      <FormLabel component='legend'>進捗</FormLabel>
      <RadioGroup
        aria-label='progress'
        value={state.progress}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          immerDispatch({ type: 'successfulChange', payload: e.target.value })
        }
      >
        <FormControlLabel value='成功' control={<Radio />} label='成功' />
        <FormControlLabel value='失敗' control={<Radio />} label='失敗' />
      </RadioGroup>
      <TextInput
        fullWidth={true}
        label='振り返り'
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          immerDispatch({ type: 'noteChange', payload: e.target.value })
        }
        value={state.note}
        type='text'
      />
      <MarginTop mt={4} />
      <CustomButton
        half='half'
        label='作成'
        color='primary'
        onClick={handleSubmit}
      />
    </Page>
  );
};

export { CreateReview };
