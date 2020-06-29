import React, { ChangeEvent, useCallback } from 'react';
import { useImmerReducer } from 'use-immer';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  LiveValidateMessage,
  TextInput,
  CustomButton,
  MarginTop,
} from '../UIkit';
import { Form, ShowPassword, ButtonWrap } from './FormStyled';
import {
  isValidEmailFormat,
  isValidRequiredInput,
} from '../../utils/validates';
import { signUp } from '../../redux/modules/users';

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
        payload: 'Eメールまたはパスワードが正しくありません',
      });
      return;
    }
    if (!isValidEmailFormat(state.email)) {
      immerDispatch({
        type: 'valideteError',
        payload: 'Eメールが正しくありません',
      });
      return;
    }
    const { username, email, password } = state;
    try {
      await disaptch(signUp(username, email, password));
      immerDispatch({ type: 'resetValue' });
      history.push('/');
    } catch (error) {
      immerDispatch({
        type: 'valideteError',
        payload: 'ユーザ登録に失敗しました',
      });
    }
  };

  // handleChange
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

  // show password

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
        <LiveValidateMessage> {state.message}</LiveValidateMessage>
      )}
      <TextInput
        onChange={handleUsernameChange}
        value={state.username}
        type='text'
        label='ユーザーネーム'
      />
      <MarginTop mt={2} />
      <TextInput
        onChange={handleEmailChange}
        value={state.email}
        type='email'
        label='Eメール'
      />
      <MarginTop mt={2} />
      <TextInput
        onChange={handlePasswordChange}
        value={state.password}
        type={state.showPassword ? 'text' : 'password'}
        autoComplete='off'
        label='パスワード'
      />
      <MarginTop mt={1} />
      <ShowPassword onClick={() => handleShow(state.showPassword)}>
        {state.showMessage}
      </ShowPassword>
      <ButtonWrap>
        <CustomButton
          label='サインアップ'
          color='primary'
          onClick={handleSubmit}
          disabled={state.send}
        />
      </ButtonWrap>
    </Form>
  );
};

export { SignUp };
