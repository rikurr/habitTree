import React from 'react';
import { Box } from '@material-ui/core';

type Props = {
  mt: number;
};

const MarginTop = (props: Props) => {
  return <Box mt={props.mt} />;
};

export { MarginTop };
