import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from './redux/modules/users';

import Auth from './Auth';
import {
  Home,
  HomeGuest,
  NotFuond,
  Feed,
  Rating,
  UserDetail,
} from './templates';
import { LoadingIcon } from './components/UIkit';

const CreateHabit = React.lazy(() => import('./templates/CreateHabit'));
const SignInAndSignUp = React.lazy(() => import('./templates/SignInAndSignUp'));
const HabitDetail = React.lazy(() => import('./templates/HabitDetail'));

const Router = () => {
  const user = useSelector(selectUser);
  const { hasHabit, level } = user.currentUser;
  return (
    <Suspense fallback={LoadingIcon}>
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
          <Route exact path='/rating' component={Rating} />
          <Route exact path='/user-detail/:uid' component={UserDetail} />
          {hasHabit < level && (
            <>
              <Route exact path='/create-habit' component={CreateHabit} />
            </>
          )}
        </Auth>
        <Route component={NotFuond} />
      </Switch>
    </Suspense>
  );
};

export default Router;
