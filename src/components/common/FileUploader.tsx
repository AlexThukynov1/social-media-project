import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

export default function FileUploader() {
const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div>File Uploader</div>
  )
}
