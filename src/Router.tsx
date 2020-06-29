import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Counter } from './features/counter/Counter';
import { Home, HomeGuest, SignInAndSignUp } from './templates';

const Router = () => {
  return (
    <Switch >
      <Route exact path='/counter' component={Counter} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/homeguest' component={HomeGuest} />
      <Route exact path='/signin' component={SignInAndSignUp} />
    </Switch>
  );
};

export default Router;
