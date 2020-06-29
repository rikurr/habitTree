import React, { useState } from 'react';
import styled from 'styled-components';
import { Page } from '../components/UIkit';
import tracker from '../assets/tracker.svg';
import male from '../assets/male.svg';
import female from '../assets/female.svg';
import { Typography } from '@material-ui/core';
import { SignIn, SignUp } from '../components/SingInAndSignUp';

type ToggleProps = {
  toggle?: boolean;
};

const SignInAndSignUp = () => {
  const [toggleForm, setToggleForm] = useState<boolean>(true);
  return (
    <Page title='signin' wide={true}>
      <Typography style={{ textAlign: 'center' }} variant='h5'>
        habit<span style={{ color: '#00796b' }}>Tree</span>
      </Typography>
      <FormWrap>
        <ActivityWrap>
          <Image src={tracker} alt='アプリイメージ' />
        </ActivityWrap>
        <LoginWrap>
          <ToogleWrap>
            <AvatarImage
              src={toggleForm ? male : female}
              alt='ユーザーイメージ'
            />
            <ToggleNav style={{ display: 'flex' }}>
              <LoginLink
                onClick={() => setToggleForm(!toggleForm)}
                toggle={toggleForm}
              >
                ログイン
              </LoginLink>
              <RegisterLink
                onClick={() => setToggleForm(!toggleForm)}
                toggle={toggleForm}
              >
                新規登録
              </RegisterLink>
            </ToggleNav>
          </ToogleWrap>
          {toggleForm ? <SignIn /> : <SignUp />}
        </LoginWrap>
      </FormWrap>
    </Page>
  );
};

const FormWrap = styled.div`
  width: 90%;
  margin: 0 auto;
  height: 60vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ActivityWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  border-radius: 20px;
  @media (max-width: 900px) {
    display: none;
  }
`;

const ToggleNav = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const LoginLink = styled.h2<ToggleProps>`
  border-bottom: ${(p) =>
    p.toggle ? `4px solid ${p.theme.palette.primary.main}` : 'none'};
  padding: 0 10px;
  cursor: pointer;
  color: ${(p) => (p.toggle ? '#333' : '#aaa')};
`;

const RegisterLink = styled.h2<ToggleProps>`
  border-bottom: ${(p) =>
    p.toggle ? 'none' : `4px solid ${p.theme.palette.primary.main}`};
  padding: 0 10px;
  cursor: pointer;
  color: ${(p) => (p.toggle ? '#aaa' : '#333')};
`;

const Image = styled.img`
  max-width: 500px;
  width: 100%;
`;

const LoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30;
`;

const ToogleWrap = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const AvatarImage = styled.img`
  max-width: 100px;
  width: 100%;
`;

export { SignInAndSignUp };
