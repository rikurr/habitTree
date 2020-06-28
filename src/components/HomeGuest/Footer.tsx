import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterWrap>
      <p>
        <Link to='/'>ホーム</Link> | <Link to='/login'>サインイン</Link>
      </p>
      <p>
        Copyright &copy; 2020{' '}
        <a href='https://github.com/riku0329/habit' target='blank'>
          progress tree
        </a>
        . All rights reserved.
      </p>
    </FooterWrap>
  );
};

const FooterWrap = styled.footer`
  margin: 0 auto;
  padding: 20px;
  height: 100%;
  background: #121212;
  p {
    margin: 0;
    text-align: center;
    color: #aaa;
  }
  a {
    color: #fff;
  }
  a:hover {
    opacity: 0.8;
    color: #fff;
    text-decoration: underline;
  }
`;

export { Footer };
