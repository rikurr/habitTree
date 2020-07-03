import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Page,
  CustomButton,
  ProgressChart,
  MarginTop,
  LoadingIcon,
} from '../components/UIkit';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { AccessTime } from '@material-ui/icons';
import RepeatIcon from '@material-ui/icons/Repeat';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { selectUser } from '../redux/modules/users';
import { selectHabit, fetchhabitDetail } from '../redux/modules/habits';
import { getDate } from '../utils/dateFormat';
import {
  ProgressCounter,
  CreateReview,
  Review,
} from '../components/HabitDetail';
import styled from 'styled-components';
import { NotFuond } from './NotFuond';

const HabitDetail = () => {
  const { userId, habitId } = useParams();
  const user = useSelector(selectUser);
  const habits = useSelector(selectHabit);
  const dispatch = useDispatch();

  const today = getDate(0);

  useEffect(() => {
    dispatch(fetchhabitDetail(userId, habitId));
  }, [userId, habitId, dispatch]);

  const listItems = [
    {
      icon: <AccessTime color='primary' />,
      text: (
        <>
          開始日:
          <span style={{ color: '#009688' }}>
            {habits.habitDetail.startDate}
          </span>
        </>
      ),
    },
    {
      icon: <CheckCircleOutlineIcon color='primary' />,
      text: (
        <>
          チェック日:
          <span style={{ color: '#009688' }}>
            {habits.habitDetail.checkDate}
          </span>
        </>
      ),
    },
    {
      icon: <RepeatIcon color='primary' />,
      text: (
        <>
          確認:
          <span style={{ color: '#009688' }}>
            {habits.habitDetail.repeat}日ごと
          </span>
        </>
      ),
    },
  ];

  if (!habits.habitDetail.id && !habits.isFetching) {
    return <NotFuond />;
  }
  if (habits.isFetching) {
    return <LoadingIcon />;
  }

  if (habits.habitDetail.checkDate) {
    if (
      today >= habits.habitDetail.checkDate &&
      user.currentUser.uid === habits.habitDetail.user.uid
    ) {
      return <CreateReview />;
    }
  }

  return (
    <Page title='Habit'>
      <Typography style={{ textAlign: 'center' }} variant='h1'>
        {habits.habitDetail.user.username}
      </Typography>
      <MarginTop mt={2} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography variant='h3'>{habits.habitDetail.name}</Typography>
          <ProgressCounter />
        </Grid>
        <Grid item xs={12} sm={12}>
          <ProgressChart
            title='Progress'
            from={habits.habitDetail.successfulCount}
            to={habits.habitDetail.progressCount}
            message='達成率'
            progress={true}
          />
        </Grid>
      </Grid>
      <MarginTop mt={2} />
      <HabitInfo>
        {listItems.map((item, i) => (
          <List key={i}>
            <ListItem>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.text}</ListItemText>
            </ListItem>
          </List>
        ))}
      </HabitInfo>
      {habits.habitDetail.reviews.length > 0 ? <Review /> : null}
      <MarginTop mt={2} />
      <CustomButton
        label='削除する'
        color='primary'
        onClick={() => console.log('削除')}
        half='half'
      />
    </Page>
  );
};

const HabitInfo = styled.div`
  padding: 12px;
  border-radius: 8px;
  height: 100%;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
`;

export { HabitDetail };
