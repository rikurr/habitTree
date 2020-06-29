import React from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../components/UIkit';
import styled from 'styled-components';

const NotFuond = () => {
  return (
    <Page title='Not Found'>
      <h2>お探しのページは存在しません。</h2>
      <CustomLink to='/signin'>ホームに戻る</CustomLink>
    </Page>
  );
};

const CustomLink = styled(Link)`

  color: ${p => p.theme.palette.primary.main};
`

export { NotFuond };
