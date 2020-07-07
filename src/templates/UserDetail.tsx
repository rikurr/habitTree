import React, { useEffect } from 'react';
import {
  Page,
  MarginTop,
  ProgressChart,
  SecondaryText,
  LoadingIcon,
} from '../components/UIkit';
import { Typography } from '@material-ui/core';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectUser } from '../redux/modules/users';
import { getHabitMessage, getExperience, dateToString } from '../utils';
import { LevelText } from '../components/Home/HabitList';

const UserDetail = () => {
  const { uid } = useParams();
  const dispatch = useDispatch();
  const { user, userFetching } = useSelector(selectUser);
  useEffect(() => {
    dispatch(fetchUser(uid));
  }, [uid]);
  return (
    <Page title='User Detail'>
      {userFetching ? (
        <LoadingIcon />
      ) : (
        <>
          <Typography variant='h2'>{user.username}</Typography>
          <MarginTop mt={1} />
          <LevelText>
            Level <SecondaryText>{user.level}</SecondaryText>
          </LevelText>
          <MarginTop mt={4} />
          <ProgressChart
            title='Next Level'
            message={getHabitMessage(user.level)}
            from={user.points}
            to={getExperience(user.level)}
            progress={false}
          />
        </>
      )}
    </Page>
  );
};

export { UserDetail };
