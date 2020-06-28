import React, { ChangeEvent, useCallback } from 'react';
import { useImmerReducer } from 'use-immer';
import { Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LiveValidateMessage, TextInput, CustomButton } from '../UIkit';
import { Form, ShowPassword, ButtonWrap } from './FormStyled';
import {
  isValidEmailFormat,
  isValidRequiredInput,
} from '../../utils/validates';

type SignUpState = {
  username: string;
  email: string;
  password: string;
  send: boolean;
  validationError: boolean;
  showPassword: boolean;
  message: string;
  showMessage: string;
};

type ValueState = {
  username: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const initialState: SignUpState = {
    username: '',
    email: '',
    password: '',
    send: false,
    validationError: false,
    showPassword: false,
    message: '',
    showMessage: 'パスワードを表示する',
  };

  const reducer = (draft: SignUpState, action: any) => {
    switch (action.type) {
      case 'usernameChange':
        draft.username = action.payload;
        return;
      case 'emailChange':
        draft.email = action.payload;
        return;
      case 'passwordChange':
        draft.password = action.payload;
        return;
      case 'clickButton':
        draft.send = true;
        return;
      case 'valideteError':
        draft.validationError = true;
        draft.send = false;
        draft.message = action.payload;
        return;
      case 'resetValue':
        draft.username = '';
        draft.email = '';
        draft.password = '';
        draft.send = false;
        return;
      case 'setShowPassword':
        draft.showPassword = !draft.showPassword;
        return;
      case 'setShowMessage':
        draft.showMessage = action.payload;
        return;
    }
  };

  const [state, immerDispatch] = useImmerReducer(reducer, initialState);
  const history = useHistory();
  const disaptch = useDispatch();

  const handleSubmit = async () => {
    immerDispatch({ type: 'clickButton' });
    if (!isValidRequiredInput(state.username, state.email, state.password)) {
      immerDispatch({
        type: 'valideteError',
        payload: 'emailまたはpasswordが正しくありません',
      });
      return;
    }
    if (!isValidEmailFormat(state.email)) {
      immerDispatch({
        type: 'valideteError',
        payload: 'emailが正しくありません',
      });
      return;
    }

    try {
      const { username } = state;

      immerDispatch({ type: 'resetValue' });

      history.push('/create-active');
    } catch (error) {
      immerDispatch({
        type: 'valideteError',
        payload: 'ユーザ登録に失敗しました',
      });
    }
  };

  const handleUsernameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      immerDispatch({ type: 'usernameChange', payload: e.target.value });
    },
    [immerDispatch]
  );
  const handleEmailChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      immerDispatch({ type: 'emailChange', payload: e.target.value });
    },
    [immerDispatch]
  );
  const handlePasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      immerDispatch({ type: 'passwordChange', payload: e.target.value });
    },
    [immerDispatch]
  );

  const handleShow = (display: boolean): void => {
    immerDispatch({ type: 'setShowPassword' });
    if (display === true) {
      immerDispatch({
        type: 'setShowMessage',
        payload: 'パスワードを表示する',
      });
    } else {
      immerDispatch({
        type: 'setShowMessage',
        payload: 'パスワードを閉じる',
      });
    }
  };

  return (
    <Form>
      {' '}
      {state.validationError && (
        <LiveValidateMessage>
          電子メールまたはパスワードが正しくありません。
        </LiveValidateMessage>
      )}
      <TextInput
        onChange={handleUsernameChange}
        value={state.username}
        type='text'
        label='ユーザーネーム'
      />
      <Box mt={2} />
      <TextInput
        onChange={handleEmailChange}
        value={state.email}
        type='email'
        label='Eメール'
      />
      <Box mt={2} />
      <TextInput
        onChange={handlePasswordChange}
        value={state.password}
        type={state.showPassword ? 'text' : 'password'}
        autoComplete='off'
        label='パスワード'
      />
      <Box mt={1} />
      <ShowPassword onClick={() => handleShow(state.showPassword)}>
        {state.showMessage}
      </ShowPassword>
      <ButtonWrap>
        <CustomButton
          label='ログイン'
          color='primary'
          onClick={handleSubmit}
          disabled={state.send}
        />
      </ButtonWrap>
    </Form>
  );
};

export { SignUp };
