import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { selectHabit } from '../../redux/modules/habits';
import { selectUser, levelUp } from '../../redux/modules/users';
import {
  MarginTop,
  ProgressChart,
  SecondaryText,
  CustomButton,
} from '../UIkit';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { getExperience, getHabitMessage } from '../../utils/';

const HabitList = () => {
  const { myHabit } = useSelector(selectHabit);
  const { currentUser } = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <>
      <Typography variant='h2'>Hello,{currentUser.username}</Typography>
      <MarginTop mt={1} />
      <LevelText>
        Level <SecondaryText>{currentUser.level}</SecondaryText>
      </LevelText>
      <LevelText>習慣を{currentUser.level}つまで所持できます。</LevelText>
      <MarginTop mt={4} />
      <ProgressChart
        title='Next Level'
        message={getHabitMessage(currentUser.level)}
        from={currentUser.points}
        to={getExperience(currentUser.level)}
        progress={false}
      />
      {currentUser.points >= getExperience(currentUser.level) && (
        <>
          <MarginTop mt={2} />
          <CustomButton
            onClick={() => dispatch(levelUp())}
            label='レベルアップする'
            color='secondary'
          />
        </>
      )}
      <MarginTop mt={4} />
      <Typography variant='h2'>
        MY Habits <SecondaryText>{myHabit.length}</SecondaryText>
      </Typography>
      <MarginTop mt={4} />
      <Grid container spacing={1}>
        {myHabit.map((habit) => (
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
                  <SecondaryText>{habit.checkDate}</SecondaryText>
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
  cursor: pointer;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 12px;
  transition: .4s;
  :hover {
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.6);
  }
`;

export const HabitContent = styled.div`
  display: flex;
  align-items: center;
`;

export const CustomLink = styled(Link)`
  color: #333;
  text-decoration: none;
`;

export const CustomAvatar = styled(Avatar)`
  color: #fff;
  background: ${(p) => p.theme.palette.secondary.light};
  margin: 0 16px;
`;

export const CustomIcon = styled(FavoriteIcon)`
  color: ${(p) => p.theme.palette.primary.main};
`;

export const Title = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
  margin: 0;
`;

export const SubTitle = styled.p`
  font-size: 1rem;
  margin: 0;
  color: #aaa;
`;

export const HabitFotter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
`;

export const SuccessfulText = styled.span`
  color: ${(p) => p.theme.palette.primary.main};
  font-weight: bold;
`;

export const LevelText = styled.p`
  font-weight: bold;
  color: #aaa;
  font-size: 1.4rem;
`;

export { HabitList };
