import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  Home,
  HomeGuest,
  SignInAndSignUp,
  NotFuond,
  CreateHabit,
  HabitDetail,
} from './templates';
import Auth from './Auth';
import { useSelector } from 'react-redux';
import { selectUser } from './redux/modules/users';

const Router = () => {
  const user = useSelector(selectUser);
  const { hasHabit, level } = user.currentUser;
  return (
    <Switch>
      <Route exact path='/homeguest' component={HomeGuest} />
      <Route exact path='/signin' component={SignInAndSignUp} />
      <Auth>
        <Route exact path='/' component={Home} />
        <Route
          exact
          path='/user/:userId/habit/:habitId'
          component={HabitDetail}
        />
        {hasHabit < level && (
          <>
            <Route exact path='/create-habit' component={CreateHabit} />
          </>
        )}
      </Auth>
      <Route component={NotFuond} />
    </Switch>
  );
};

export default Router;
