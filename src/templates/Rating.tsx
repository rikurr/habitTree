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
} from '../components/Home/HabitList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, selectUser } from '../redux/modules/users';

const Rating = () => {
  const dispatch = useDispatch();
  const { userList, usersFetching } = useSelector(selectUser);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return (
    <Page title='Rating'>
      <Typography variant='h2'>Rating Top20</Typography>
      <MarginTop mt={2} />
      {usersFetching ? (
        <LoadingIcon />
      ) : (
        <Grid style={{ maxWidth: 600, margin: '0 auto' }} container spacing={2}>
          {userList.map((user, i) => (
            <Grid key={user.uid} item xs={12}>
              <HabitWrap>
                <CustomLink to={`user-detail/${user.uid}`}>
                  <HabitContent>
                    <CustomAvatar>{++i}</CustomAvatar>
                    <div>
                      <Title>{user.username}</Title>
                      <SubTitle>Lv{user.level}</SubTitle>
                    </div>
                  </HabitContent>
                </CustomLink>
              </HabitWrap>
            </Grid>
          ))}
        </Grid>
      )}
    </Page>
  );
};

export { Rating };
