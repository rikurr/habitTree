import React, { ChangeEvent, FormEvent, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Box,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Typography,
} from '@material-ui/core';
import styled from 'styled-components';
import { useImmerReducer } from 'use-immer';
import { Page, TextInput, MarginTop } from '../components/UIkit';
import { format, getDate } from '../utils/dateFormat';

import { selectUser } from '../redux/modules/users';
import { useSelector, useDispatch } from 'react-redux';
import { flashMessage } from '../redux/modules/flashMessages';
import { createHabit } from '../redux/modules/habits';
import { featureHabits } from '../utils';

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
      case 'featureHabit':
        draft.name = action.payload;
        return;
    }
  };

  const [state, immerDispatch] = useImmerReducer(reducer, initialState);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (state.name.trim() === '') {
      return;
    }

    createHabit(state).then((res) => {
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
          <Typography variant='h2'>新しい習慣の作成</Typography>
          <Label>一度作成した習慣は削除できますが変更できません。</Label>
          <MarginTop mt={4} />
          <TextInput
            onChange={handleNameChange}
            value={state.name}
            type='text'
            label='習慣の名前'
          />
          <MarginTop mt={4} />
          <FormLabel>おすすめ</FormLabel>
          <MarginTop mt={2} />
          <HabitList>
            {featureHabits.map((habit, i) => (
              <HabitItem
                key={i}
                onClick={() =>
                  immerDispatch({ type: 'featureHabit', payload: habit.title })
                }
              >
                <img src={habit.image} alt='habit' />
                <HabitContent>
                  <p>{habit.title}</p>
                </HabitContent>
              </HabitItem>
            ))}
          </HabitList>

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

const Label = styled.p`
  font-size: 1rem;
  margin: 0;
  color: ${(p) => p.theme.palette.secondary.main};
`;

const HabitList = styled.div`
  width: 100%;
  height: 200px;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
  padding: 12px;
  border-radius: 8px;
  background: #efefef;
  @media (min-width: 600px) {
    height: 230px;
  }
`;
const HabitItem = styled.div`
  min-width: 150px;
  height: 200px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding-top: 16px;
  margin-right: 12px;
  background: #fff;
  :hover {
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.4);
  }
  img {
    width: 100%;
    height: 100px;
  }
  @media (min-width: 600px) {
    min-width: 250px;
    height: 200px;
  }
`;

const HabitContent = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
`;

export default CreateHabit;
