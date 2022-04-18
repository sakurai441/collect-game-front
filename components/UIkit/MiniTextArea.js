import { TextareaAutosize } from '@material-ui/core'
import * as React from 'react'

export default function MiniTextArea(props) {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col mb-2 w-3/4">
        <TextareaAutosize
          aria-label="minimum height"
          minRows={4}
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
      </div>
    </div>
  )
}
