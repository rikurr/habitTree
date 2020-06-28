import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';
import { Page } from './Page';

type Props = {
  loading: boolean;
};

const LoadingIcon: FC<Props> = ({ children, loading }) => {
  return (
    <>
      {loading ? (
        <Page title='...'>
          <DotsLoading>
            <div></div>
          </DotsLoading>
        </Page>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

const opacitychange = keyframes`
  0%,
  100% {
    opacity: 0;
  }
  60% {
    opacity: 1;
  }
`;

const DotsLoading = styled.div`
  margin: 200px auto;
  text-align: center;
  ::after,
  ::before {
    content: ' ';
  }
  div,
  ::after,
  ::before {
    margin: 35px 5px;
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #888;
    opacity: 0;
  }
  ::before {
    -moz-animation: ${opacitychange} 1s ease-in-out infinite;
    -webkit-animation: ${opacitychange} 1s ease-in-out infinite;
    -o-animation: ${opacitychange} 1s ease-in-out infinite;
    animation: ${opacitychange} 1s ease-in-out infinite;
  }
  div {
    -moz-animation: ${opacitychange} 1s ease-in-out 0.33s infinite;
    -webkit-animation: ${opacitychange} 1s ease-in-out 0.33s infinite;
    -o-animation: ${opacitychange} 1s ease-in-out 0.33s infinite;
    animation: ${opacitychange} 1s ease-in-out 0.33s infinite;
    -webkit-animation-fill-mode: infinite;
    animation-fill-mode: infinite;
  }
  ::after {
    -moz-animation: ${opacitychange} 1s ease-in-out 0.66s infinite;
    -webkit-animation: ${opacitychange} 1s ease-in-out 0.66s infinite;
    -o-animation: ${opacitychange} 1s ease-in-out 0.66s infinite;
    animation: ${opacitychange} 1s ease-in-out 0.66s infinite;
    -webkit-animation-fill-mode: infinite;
    animation-fill-mode: infinite;
  }
`;

export { LoadingIcon };
