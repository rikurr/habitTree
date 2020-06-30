import React from 'react';
import styled from 'styled-components';
import { Typography, Box } from '@material-ui/core';
import social from '../../assets/social.svg';
import create from '../../assets/create.svg';
import progress from '../../assets/progress.svg';

const Feature = () => {
  return (
    <FeatureSection component='section'>
      <Typography style={{ textAlign: 'center' }} variant='h2'>
        使い方
      </Typography>
      <FeatureContent>
        <FeatureList>
          <ImageWrap>
            <img className='image' src={create} alt='create' />
          </ImageWrap>
          <Box style={{ marginTop: 12, textAlign: 'center' }}>
            <Typography variant='h3'>習慣を作成</Typography>
            <p>
              まずは一つだけ習慣を作成できます。複数のことを一気にするのではなく続けられるようにまずは、一つのことコツコツと始めましょう！
            </p>
          </Box>
        </FeatureList>
        <FeatureList>
          <ImageWrap>
            <img className='image' src={progress} alt='progress' />
          </ImageWrap>
          <Box style={{ marginTop: 12, textAlign: 'center' }}>
            <Typography variant='h3'>進捗状況を確認する</Typography>
            <p>レポートを使用して日々の習慣の達成を確認できます。成果は長期的に現れます。目標に向かって日々の習慣のアウトプットを確認できます。</p>
          </Box>
        </FeatureList>
        <FeatureList>
          <ImageWrap>
            <img className='image' src={social} alt='social' />
          </ImageWrap>
          <Box style={{ marginTop: 12, textAlign: 'center' }}>
            <Typography variant='h3'>みんなに成果を共有できる</Typography>
            <p>
              みんなの目標や達成度が見れるので、自分のモチベーションにつながります。
              メッセージを送り合い誰かと一緒に目標に向かうこともできます。
              習慣化するために、目標を周囲と共有しましょう。
            </p>
          </Box>
        </FeatureList>
      </FeatureContent>
    </FeatureSection>
  );
};

const FeatureSection = styled(Box)`
  background: #efefef;
  width: 100%;
  height: 100%;
  padding: 40px 20px;
  margin-top: 200px;
`;

const FeatureContent = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const FeatureList = styled.div`
  max-width: 250px;
  width: 100%;
  height: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageWrap = styled.div`
  .image {
    width: 100%;
    height: 250px;
  }
`;

export { Feature };
