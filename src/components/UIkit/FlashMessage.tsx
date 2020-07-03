import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';

type MessageProps = {
  messages: string[];
};

const FlashMessages: FC<MessageProps> = ({ messages }) => {
  return (
    <FlotingAlerts>
      {messages.map((msg, i) => {
        return <Alert key={i}>{msg}</Alert>;
      })}
    </FlotingAlerts>
  );
};

const FlotingAlerts = styled.div`
  display: block;
`;

const floatingAlert = keyframes`
  0% {
    opacity: 0;
    visibility: hidden;
    transform: translateX(-50%) scale(1.2);
  }
  9% {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) scale(1);
  }
  91% {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) scale(1);
  }
  100% {
    opacity: 0;
    visibility: hidden;
    transform: translateX(-50%) scale(1.2);
  }
`;
const Alert = styled.div`
  display: none;
  position: absolute;
  z-index: 999;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  -moz-animation: ${floatingAlert} ease-in 5s forwards;
  -webkit-animation: ${floatingAlert} ease-in 5s forwards;
  -o-animation: ${floatingAlert} ease-in 5s forwards;
  animation: ${floatingAlert} ease-in 5s forwards;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  text-align: center;
  background: ${(p) => p.theme.palette.secondary.main};
  padding: 10px 40px;
  border-radius: 6px;
  color: #fff;
  font-weight: bold;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
  :last-of-type {
    display: block;
  }
`;
export { FlashMessages };
