import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Counter } from './features/counter/Counter';
import { Home, HomeGuest, SignInAndSignUp, NotFuond } from './templates';
import Auth from './Auth';

const Router = () => {
  return (
    <Switch>
      <Route exact path='/counter' component={Counter} />
      <Route exact path='/homeguest' component={HomeGuest} />
      <Route exact path='/signin' component={SignInAndSignUp} />
      <Auth>
        <Route exact path='/' component={Home} />
      </Auth>
      <Route component={NotFuond} />
    </Switch>
  );
};

export default Router;
