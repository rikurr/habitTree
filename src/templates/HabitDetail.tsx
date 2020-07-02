import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Page,
  LoadingIcon,
  CustomButton,
  ProgressChart,
  MarginTop,
} from '../components/UIkit';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
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
import { selectHabit } from '../redux/modules/habits';
import { getDate } from '../utils/dateFormat';
import { ProgressCounter } from '../components/HabitDetail';
import styled from 'styled-components';

const HabitDetail = () => {
  const { userId, habitId } = useParams();
  const user = useSelector(selectUser);
  const habits = useSelector(selectHabit);
  const dispatch = useDispatch();
  const history = useHistory();

  const today = getDate(0);

  useEffect(() => {}, []);

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

  return (
    <Page title='progress'>
      <Typography style={{ textAlign: 'center' }} variant='h2'>
        {habits.habitDetail.name}
      </Typography>
      <Grid container style={{ marginTop: 24 }}>
        <Grid item xs={12} sm={12}>
          <Typography style={{ textAlign: 'center' }} variant='h3'>
            {habits.habitDetail.name}
          </Typography>
          <ProgressCounter />
        </Grid>
        <div style={{ marginRight: 12 }} />
        <Grid style={{ marginTop: 12 }} item xs={12} sm={12}>
          <ProgressChart
            title='Progress'
            from={habits.habitDetail.progressCount}
            to={habits.habitDetail.successfulCount}
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
      {1 > 0 ? null : null}
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
