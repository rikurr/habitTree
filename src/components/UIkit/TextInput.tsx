import React from 'react';
import { TextField } from '@material-ui/core';

type Props = {
  fullWidth?: boolean;
  label: string;
  value: string;
  type: string;
  onChange: any;
  autoComplete?: string;
};

const TextInput = (props: Props) => {
  return (
    <TextField
      fullWidth={props.fullWidth}
      label={props.label}
      margin='dense'
      required={true}
      value={props.value}
      type={props.type}
      onChange={props.onChange}
      autoComplete={props.autoComplete}
    />
  );
};

export { TextInput };
