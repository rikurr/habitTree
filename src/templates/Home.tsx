import React, { useEffect } from 'react';
import { Page, LoadingIcon } from '../components/UIkit';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../redux/modules/users';
import { fetchMyHabits } from '../redux/modules/habits';
import { selectHabit } from '../redux/modules/habits';
import { FirstView } from '../components/Home';
import { HabitList } from '../components/Home/HabitList';

const Home = () => {
  const habits = useSelector(selectHabit);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { hasHabit } = user.currentUser;
  useEffect(() => {
    if (hasHabit > 0) {
      dispatch(fetchMyHabits());
    }
  }, [hasHabit, dispatch]);
  return (
    <Page title='Home'>
      {hasHabit < 1 ? <FirstView /> : null}
      {habits.isFetching || hasHabit < 1 ? <LoadingIcon /> : <HabitList />}
    </Page>
  );
};

export { Home };
