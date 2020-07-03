import React from 'react';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { CustomButton, MarginTop } from '../UIkit';
import first from '../../assets/initTree.svg';
import styled from 'styled-components';

const FirstView = () => {
  const history = useHistory();
  return (
    <FirstViewWrap>
      <ImageWrap>
        <Image src={first} alt='はじめよう' />
      </ImageWrap>
      <MarginTop mt={2} />
      <Content>
        <Typography variant='h3'>最初の習慣を作成する</Typography>
        <p>
          一度に大きく生活を変えるのは難しいです。まずは、５分瞑想するなどほんの少しの習慣を開始しましょう!
        </p>
        <p>
          脳は急激な変化を嫌う、安定化志向という性質があります。「一度に大きく変わろう」とすると、脳が拒否反応を示します。このアプリでは、一つのことをコツコツと長期的に目標を達成することを目標としています。
        </p>
        <CustomButton
          color='secondary'
          onClick={() => history.push('/create-habit')}
          label='最初の習慣を作成する'
          half='half'
        />
      </Content>
    </FirstViewWrap>
  );
};

const FirstViewWrap = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  @media (max-width: 600px) {
    width: 90%;
  }
`;

const ImageWrap = styled.div`
  width: 400px;
  height: auto;
  margin: 0 auto;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const Content = styled.div`
  width: 100%;
  text-align: center;
`;

export { FirstView };
