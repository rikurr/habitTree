import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { Page, LoadingIcon } from '../components/UIkit';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../redux/modules/users';
import { fetchMyHabits } from '../redux/modules/habits';
import {selectHabit} from '../redux/modules/habits'
import { FirstView } from '../components/Home';

const Home = () => {
  const habits = useSelector(selectHabit)
  const history = useHistory();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { hasHabit, maxHabit } = user.currentUser;
  console.log(habits.myHabit);
  useEffect(() => {
    if (hasHabit > 0) {
      dispatch(fetchMyHabits());
    }
  }, [hasHabit, dispatch]);
  return (
    <Page title='Home'>
      {hasHabit < maxHabit ? (
        <FirstView />
      ) : null}
      {habits.isFetching ? <LoadingIcon /> : (
        <h2>hello</h2>
      )}
    </Page>
  );
};



export { Home };
