import React, { useEffect } from 'react';
import { Page, MarginTop, LoadingIcon } from '../components/UIkit';
import { Typography, Grid } from '@material-ui/core';
import {
  HabitWrap,
  CustomLink,
  HabitContent,
  CustomAvatar,
  Title,
  SubTitle,
  SuccessfulText,
} from '../components/Home/HabitList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHabits, selectHabit } from '../redux/modules/habits';

const Feed = () => {
  const dispatch = useDispatch();
  const { isFetching, habits } = useSelector(selectHabit);

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  if (isFetching) {
    return <LoadingIcon />;
  }

  return (
    <Page title='Feed'>
      <Typography variant='h2'>Feed</Typography>
      <MarginTop mt={2} />
      <Grid container spacing={2}>
        {habits.map((habit) => (
          <Grid key={habit.id} item xs={12} sm={6}>
            <HabitWrap>
              <CustomLink to={`user/${habit.user.uid}/habit/${habit.id}`}>
                <HabitContent>
                  <CustomAvatar>{habit.successfulCount}</CustomAvatar>
                  <div>
                    <MarginTop mt={2} />
                    <Title>{habit.name}</Title>
                    <SubTitle>
                      {habit.user.username}: Lv{habit.user.level}
                    </SubTitle>
                    <MarginTop mt={1} />
                    <SubTitle>
                      successful:{' '}
                      <SuccessfulText>
                        {habit.successfulCount} / {habit.progressCount}
                      </SuccessfulText>{' '}
                    </SubTitle>
                  </div>
                </HabitContent>
              </CustomLink>
            </HabitWrap>
          </Grid>
        ))}
      </Grid>
    </Page>
  );
};

export { Feed };
