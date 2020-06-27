import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Counter } from './features/counter/Counter';
import { Home } from './templates';

const Router = () => {
  return (
    <Switch >
      <Route exact path='/counter' component={Counter} />
      <Route exact path='/home' component={Home} />
    </Switch>
  );
};

export default Router;
