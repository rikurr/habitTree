import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import styled, { css } from 'styled-components';

type Props = {
  label: string;
  disabled?: boolean;
  onClick: any;
  bgColor?: 'isGoogle' | null;
  color?: 'primary' | 'secondary';
  half?: boolean | null;
};

const CustomButton: FC<Props> = (props) => {
  return (
    <ButtonStyles
      type='button'
      variant='contained'
      onClick={() => props.onClick()}
      disabled={props.disabled}
      bgColor={props.bgColor ? props.bgColor : null}
      color={props.color}
      half={props.half ? props.half : null}
    >
      {props.label}
    </ButtonStyles>
  );
};

type StyledProps = {
  bgColor: 'isGoogle' | null;
  half?: boolean | null;
};

const getButtonStyles = ({ bgColor }: StyledProps) => {
  if (bgColor === 'isGoogle') {
    return css`
      background: #4285f4;
      color: #fff;
      &:hover {
        background: #357ae8;
      }
    `;
  } else {
    return;
  }
};

const ButtonStyles = styled(Button)<StyledProps>`
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
  margin-top: 15px;
  width: ${(p) => (p.half ? '50%' : '100%')};
  ${getButtonStyles};
`;

export { CustomButton };
