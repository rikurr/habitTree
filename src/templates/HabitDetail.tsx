import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
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
import {
  selectHabit,
  fetchhabitDetail,
  deleteHabit,
} from '../redux/modules/habits';
import { getDate } from '../utils/dateFormat';
import {
  ProgressCounter,
  CreateReview,
  Review,
} from '../components/HabitDetail';
import styled from 'styled-components';
import NotFuond from './NotFuond';
import { flashMessage } from '../redux/modules/flashMessages';

const HabitDetail = () => {
  const { userId, habitId } = useParams();
  const { currentUser } = useSelector(selectUser);
  const { habitDetail, isFetching } = useSelector(selectHabit);
  const dispatch = useDispatch();
  const history = useHistory();

  const today = getDate(0);

  useEffect(() => {
    dispatch(fetchhabitDetail(userId, habitId));
  }, [userId, habitId, dispatch]);

  const handleDelete = async (userId: string, habitId: string) => {
    deleteHabit(userId, habitId).then(() => {
      dispatch(flashMessage('Habitを削除しました'));
      history.push('/');
    });
  };

  const listItems = [
    {
      icon: <AccessTime color='primary' />,
      text: (
        <>
          開始日:
          <span style={{ color: '#009688' }}>{habitDetail.startDate}</span>
        </>
      ),
    },
    {
      icon: <CheckCircleOutlineIcon color='primary' />,
      text: (
        <>
          チェック日:
          <span style={{ color: '#009688' }}>{habitDetail.checkDate}</span>
        </>
      ),
    },
    {
      icon: <RepeatIcon color='primary' />,
      text: (
        <>
          確認:
          <span style={{ color: '#009688' }}>{habitDetail.repeat}日ごと</span>
        </>
      ),
    },
  ];

  if (!habitDetail.id && !isFetching) {
    return <NotFuond />;
  }
  if (isFetching) {
    return <LoadingIcon />;
  }

  if (habitDetail.checkDate) {
    if (
      today >= habitDetail.checkDate &&
      currentUser.uid === habitDetail.user.uid
    ) {
      return <CreateReview />;
    }
  }

  return (
    <Page title='Habit'>
      <Typography variant='h1'>{habitDetail.user.username}</Typography>
      <MarginTop mt={2} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography variant='h3'>{habitDetail.name}</Typography>
          <ProgressCounter />
        </Grid>
        <Grid item xs={12} sm={12}>
          <ProgressChart
            title='Progress'
            from={habitDetail.successfulCount}
            to={habitDetail.progressCount}
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
      {habitDetail.reviews.length > 0 ? <Review /> : null}
      <MarginTop mt={2} />
      {currentUser.uid === habitDetail.user.uid && (
        <CustomButton
          label='削除する'
          color='primary'
          onClick={() => handleDelete(currentUser.uid, habitId)}
          half='half'
        />
      )}
    </Page>
  );
};

const HabitInfo = styled.div`
  padding: 12px;
  border-radius: 8px;
  height: 100%;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
`;

export default HabitDetail;
