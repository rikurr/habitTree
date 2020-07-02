import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectHabit } from '../../redux/modules/habits';
import { selectUser } from '../../redux/modules/users';
import { MarginTop, ProgressChart } from '../UIkit';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

const HabitList = () => {
  const habits = useSelector(selectHabit);
  const user = useSelector(selectUser);
  return (
    <>
      <Typography variant='h2'>Total Points</Typography>
      <MarginTop mt={4} />
      <ProgressChart
        title='Level'
        message='まずは21回達成しよう'
        from={12}
        to={21}
        progress={false}
      />
      <MarginTop mt={4} />
      <Typography variant='h2'>MY Habits</Typography>
      <MarginTop mt={4} />
      <Grid container spacing={1}>
        {habits.myHabit.map((habit) => (
          <Grid key={habit.id} item xs={12} sm={6}>
            <HabitWrap>
              <CustomLink to={`user/${habit.user.uid}/habit/${habit.id}`}>
                <HabitContent>
                  <CustomAvatar>{habit.successfulCount}</CustomAvatar>
                  <div>
                    <MarginTop mt={2} />
                    <Title>{habit.name}</Title>
                    <MarginTop mt={1} />
                    <SubTitle>
                      successful:{' '}
                      <SuccessfulText>
                        {habit.successfulCount} / {habit.progressCount}
                      </SuccessfulText>{' '}
                    </SubTitle>
                  </div>
                </HabitContent>
                <HabitFotter>
                  <p>Check day</p>
                  <p>{habit.checkDate}</p>
                </HabitFotter>
              </CustomLink>
            </HabitWrap>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export const HabitWrap = styled.div`
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 12px;
  background: ${(p) => p.theme.palette.primary.main};
`;

export const HabitContent = styled.div`
  display: flex;
  align-items: center;
`;

export const CustomLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

export const CustomAvatar = styled(Avatar)`
  color: #333;
  background: ${(p) => p.theme.palette.secondary.contrastText};
  margin: 0 12px;
`;

export const CustomIcon = styled(FavoriteIcon)`
  color: ${(p) => p.theme.palette.primary.main};
`;

export const Title = styled.p`
  font-weight: bold;
  font-size: 1.3rem;
  margin: 0;
`;

export const SubTitle = styled.p`
  font-size: 1rem;
  color: #fff;
  margin: 0;
`;

export const HabitFotter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
`;

export const SuccessfulText = styled.span`
  color: ${(p) => p.theme.palette.secondary.light};
  font-weight: bold;
`;

export { HabitList };
