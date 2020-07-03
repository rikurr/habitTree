import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectHabit } from '../../redux/modules/habits';
import { dateToString } from '../../utils/dateFormat';
import { MarginTop } from '../UIkit';

const Review = () => {
  const habit = useSelector(selectHabit);
  return (
    <>
      <MarginTop mt={2} />
      <Typography variant='h3'>Review</Typography>
      <MarginTop mt={2} />
      <CardWrap>
        {habit.habitDetail.reviews.map((review: any) => {
          const date = review.created_at.toDate();
          return (
            <ReviewCard key={review.created_at.toDate()}>
              <Strong successful={review.progress}>{review.progress}</Strong>
              <Description>{review.note}</Description>
              <p>
                Day:{' '}
                <span>{dateToString(date)}</span>
              </p>
            </ReviewCard>
          );
        })}
      </CardWrap>
    </>
  );
};

const ReviewCard = styled.div`
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 8px 12px;
  @media (min-width: 600px) {
    width: 100%;
  }
`;

const CardWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
  width: 100%;
  height: 100%;
  @media (min-width: 600px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 8px;
  }
`;

type Props = {
  successful: string;
};

const Strong = styled.strong<Props>`
  font-size: 1rem;
  font-weight: bold;
  color: ${(p) =>
    p.successful === '成功'
      ? p.theme.palette.primary.main
      : p.theme.palette.secondary.main};
`;

const Description = styled.p`
  font-weight: bold;
  font-size: 0.8rem;
`;

export { Review };
