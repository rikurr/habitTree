import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Box,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from '@material-ui/core';
import styled from 'styled-components';
import { useImmerReducer } from 'use-immer';
import { Page, TextInput, MarginTop } from '../components/UIkit';
import { format, getDate } from '../utils/dateFormat';

import { selectUser } from '../redux/modules/users';
import { useSelector, useDispatch } from 'react-redux';
import { flashMessage } from '../redux/modules/flashMessages';
import { createHabit } from '../redux/modules/habits';

const today = new Date();

export type CreateHabitProps = {
  name: string;
  startDate: string;
  repeat: number;
  checkDate: string;
  uid: string;
};

const CreateHabit = () => {
  const user = useSelector(selectUser);
  const history = useHistory();
  const dispatch = useDispatch();
  const [target, setTarget] = useState('');

  const initialState: CreateHabitProps = {
    name: '',
    startDate: format(today),
    repeat: 1,
    checkDate: getDate(1),
    uid: user.currentUser.uid,
  };

  const reducer = (draft: CreateHabitProps, action: any) => {
    switch (action.type) {
      case 'habitChange':
        draft.name = action.payload;
        return;
      case 'repeatChange':
        draft.repeat = parseInt(action.payload);
        draft.checkDate = getDate(parseInt(action.payload));
        return;
    }
  };

  const [state, immerDispatch] = useImmerReducer(reducer, initialState);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (state.name.trim() === '') {
      return;
    }

    createHabit(state, target).then((res) => {
      if (res === '成功') {
        history.push('/');
        dispatch(flashMessage(`${state.name}を作成しました`));
      }
    });
  };

  const handleRepeatChange = useCallback(
    (e: ChangeEvent<{ value: unknown }>): void => {
      immerDispatch({
        type: 'repeatChange',
        payload: e.target.value as number,
      });
    },
    [immerDispatch]
  );

  const handleNameChange = useCallback(
    (e: ChangeEvent<{ value: string }>): void => {
      immerDispatch({ type: 'habitChange', payload: e.target.value });
    },
    [immerDispatch]
  );

  return (
    <Page title='Create Habit'>
      <Box p={6}>
        <HabitForm onSubmit={handleSubmit}>
          <MarginTop mt={6} />
          <Label>目標を達成するために新しい習慣や小さな目標を決める</Label>
          <TextInput
            onChange={handleNameChange}
            value={state.name}
            type='text'
            label='（例）よく寝る、毎朝15分瞑想'
          />
          <MarginTop mt={6} />
          <FormLabel component='legend'>習慣化の振り返り頻度</FormLabel>
          <RadioGroup
            aria-label='アウトプット'
            name='アウトプット'
            value={state.repeat}
            onChange={handleRepeatChange}
          >
            <FormControlLabel
              value={1}
              control={<Radio />}
              label='毎日:1ポイント'
            />
            <FormControlLabel
              value={3}
              control={<Radio />}
              label='３日ごと:2ポイント'
            />
            <FormControlLabel
              value={7}
              control={<Radio />}
              label='１週間:5ポイント'
            />
          </RadioGroup>
          <DateWrap>
            <p>開始日: {state.startDate}</p>
            <p>最初の振り返り日: {state.checkDate}</p>
          </DateWrap>
          <CustomButton type='submit' color='primary' variant='contained'>
            作成する
          </CustomButton>
        </HabitForm>
      </Box>
    </Page>
  );
};

const HabitForm = styled.form`
  display: flex;
  flex-direction: column;
  @media (min-width: 600px) {
    max-width: 600px;
    margin: 0 auto;
  }
`;

const CustomButton = styled(Button)`
  border-radius: 25px;
  height: 40px;
  margin-top: 30px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
  @media (min-width: 600px) {
    width: 30%;
  }
`;

const DateWrap = styled.div`
  color: ${(p) => p.theme.palette.secondary.main};
  font-weight: bold;
  font-size: 1rem;
`;

const Label = styled.h3`
  font-size: 1.4rem;
  margin: 0;
`;

export { CreateHabit };
