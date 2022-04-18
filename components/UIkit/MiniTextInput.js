import TextField from '@material-ui/core/TextField';
import * as React from 'react';

export default function MiniTextInput(props) {
  return (
    <div className="flex justify-center w-full">
        <div className="flex flex-col mb-2 w-2/5">
          <TextField
              id={props.id}
              label={props.label}
              variant="standard"
              type={props.type}
              onChange={props.onChange}
              />
        </div>
    </div>
  );
}