import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { selectHabit } from '../../redux/modules/habits';
import { MarginTop } from '../UIkit';

const ProgressCounter = () => {
  const habits = useSelector(selectHabit);
  return (
    <>
      <MarginTop mt={2} />
      <Typography variant='h2'>Progress</Typography>
      <MarginTop mt={2} />
      <Grid container spacing={1}>
        <Grid style={{ height: 250 }} item xs={6} sm={6}>
          <CustomPaper>
            <Count>{habits.habitDetail.progressCount}</Count>
            <h2>現在の記録</h2>
            <p>継続して記録を伸ばそう！</p>
          </CustomPaper>
        </Grid>
        <Grid item style={{ height: 250 }} xs={6} sm={6}>
          <CustomPaper>
            <Count>
              {habits.habitDetail.successfulCount}/
              {habits.habitDetail.progressCount}
            </Count>
            <h2>成功数</h2>
            <p>成功数を上げてより目標に近づこう！</p>
          </CustomPaper>
        </Grid>
      </Grid>
    </>
  );
};

const CustomPaper = styled.div`
  padding: 12px;
  border-radius: 8px;
  height: 100%;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
  background: ${(p) => p.theme.palette.primary.main};
  color: ${(p) => p.theme.palette.primary.contrastText};
`;

const Count = styled.span`
  font-size: 3rem;
  font-weight: bold;
  color: ${(p) => p.theme.palette.secondary.light};
`;

export { ProgressCounter };
