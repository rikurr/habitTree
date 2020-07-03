import React from 'react';
import styled, { css } from 'styled-components';
import { Typography } from '@material-ui/core';
import { MarginTop } from './MarginTop';

type prop = {
  deg: number;
  percent: number;
};

type Props = {
  to: number;
  from: number;
  message: string;
  progress: boolean;
  title: 'Total Points' | 'Progress';
};

const ProgressChart = (props: Props) => {
  const { to, from } = props;
  let raito: number = Math.floor((from / to) * 100);
  let percent: number = raito;
  const deg: number = (360 * percent) / 100;

  return (
    <ChartWrap>
      <MarginTop mt={4} />
      <Typography variant='h3'>{props.title}</Typography>
      <MarginTop mt={4} />
      <CircleContainer percent={percent} deg={deg}>
        <div className='ppc-progress'>
          <div className='ppc-progress-fill'></div>
        </div>
        <div className='progress-percent'>
          <div className='progress-percent-wrap'>
            {props.progress ? (
              <Typography variant='h4'>{raito ? raito : 0}%</Typography>
            ) : (
              <Typography variant='h4'>
                {' '}
                {from} / {to}
              </Typography>
            )}
          </div>
        </div>
      </CircleContainer>
      <ChartName>{props.message}</ChartName>
    </ChartWrap>
  );
};

const ChartWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 24px;
  @media (min-width: 600px) {
    width: 100%;
  }
`;

const transform = ({ deg }: any) => {
  return css`
    transform: rotate(${deg}deg);
  `;
};

const getPercent = ({ percent }: any) => {
  if (percent > 50) {
    return css`
      background: ${(p) => p.theme.palette.secondary.main};
      .ppc-progress {
        clip: rect(0, 50px, 100px, 0);
      }
      .ppc-progress .ppc-progress-fill {
        clip: rect(0, 100px, 100px, 50px);
        background: ${(p) => p.theme.palette.secondary.light};
      }
    `;
  }
  return null;
};

const getPercents = ({ percent }: any) => {
  if (percent > 50) {
    return css`
      .ppc-progress {
        clip: rect(0, 100px, 200px, 0);
      }
      .ppc-progress .ppc-progress-fill {
        clip: rect(0, 200px, 200px, 100px);
      }
    `;
  }
  return null;
};

const CircleContainer = styled.div<prop>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${(p) => p.theme.palette.secondary.light};
  position: relative;
  .ppc-progress {
    content: '';
    position: absolute;
    border-radius: 50%;
    left: calc(50% - 50px);
    top: calc(50% - 50px);
    width: 100px;
    height: 100px;
    clip: rect(0, 100px, 100px, 50px);
  }
  .ppc-progress .ppc-progress-fill {
    content: '';
    position: absolute;
    border-radius: 50%;
    left: calc(50% - 50px);
    top: calc(50% - 50px);
    width: 100px;
    height: 100px;
    clip: rect(0, 50px, 100px, 0);
    background: ${(p) => p.theme.palette.secondary.main};
    ${transform}
  }
  ${getPercent}
  .progress-percent {
    content: '';
    position: absolute;
    border-radius: 50%;
    left: calc(50% - 86px / 2);
    top: calc(50% - 86px / 2);
    width: 86px;
    height: 86px;
    background: #fff;
    text-align: center;
    display: table;
  }
  .progress-percent span {
    display: block;
    font-size: 1.8rem;
    font-weight: bold;
    color: #333;
  }
  .progress-percent-wrap {
    display: table-cell;
    vertical-align: middle;
  }
  @media (min-width: 600px) {
    width: 200px;
    height: 200px;
    .ppc-progress {
      left: calc(50% - 100px);
      top: calc(50% - 100px);
      width: 200px;
      height: 200px;
      clip: rect(0, 200px, 200px, 100px);
    }
    .ppc-progress .ppc-progress-fill {
      left: calc(50% - 100px);
      top: calc(50% - 100px);
      width: 200px;
      height: 200px;
      clip: rect(0, 100px, 200px, 0);
    }

    ${getPercents}
    .progress-percent {
      left: calc(50% - 173.91304px / 2);
      top: calc(50% - 173.91304px / 2);
      width: 173.91304px;
      height: 173.91304px;
    }
    .progress-percent span {
      font-size: 2.6em;
    }
  }
`;

const ChartName = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
  @media (max-width: 600px) {
    font-size: 0.8rem;
    font-weight: bold;
  }
`;

export { ProgressChart };
