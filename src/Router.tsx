import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Counter } from './features/counter/Counter';
import {
  Home,
  HomeGuest,
  SignInAndSignUp,
  NotFuond,
  CreateHabit,
} from './templates';
import Auth from './Auth';
import { useSelector } from 'react-redux';
import { selectUser } from './redux/modules/users';

const Router = () => {
  const user = useSelector(selectUser);
  const { hasHabit, maxHabit } = user.currentUser;
  return (
    <Switch>
      <Route exact path='/counter' component={Counter} />
      <Route exact path='/homeguest' component={HomeGuest} />
      <Route exact path='/signin' component={SignInAndSignUp} />
      <Auth>
        <Route exact path='/' component={Home} />
        {hasHabit < maxHabit && (
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
