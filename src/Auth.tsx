import React, { useEffect, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, listenAuth } from './redux/modules/users';
import { LoadingIcon } from './components/UIkit';
import HomeGuest from './templates/HomeGuest';

const Auth: FC = ({ children }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { isSignedIn, isFetching } = user;
  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuth());
    }
  }, []);

  if (isFetching) {
    return <LoadingIcon />;
  }

  if (!isSignedIn && !isFetching) {
    return <HomeGuest />;
  } else {
    return <>{children}</>;
  }
};

export default Auth;
