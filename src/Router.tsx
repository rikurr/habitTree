import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from './redux/modules/users';

import Auth from './Auth';
import {
  Home,
  HomeGuest,
  SignInAndSignUp,
  NotFuond,
  CreateHabit,
  HabitDetail,
  Feed,
} from './templates';

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
        <Route exact path='/feed' component={Feed} />
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
