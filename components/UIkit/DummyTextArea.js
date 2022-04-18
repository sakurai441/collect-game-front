import { TextareaAutosize } from '@material-ui/core'
import * as React from 'react'

export default function DummyTextArea(props) {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col mb-2 w-2/5">
        <TextareaAutosize
          aria-label="minimum height"
          minRows={1}
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
      </div>
    </div>
  )
}
