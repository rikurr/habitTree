import React from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import { Page } from '../components/UIkit';

const Home = () => {
  const history = useHistory()
  return (
    <Page title='Home'>
      <Button onClick={() => history.goBack()}>on</Button>
    </Page>
  );
};

export { Home };
