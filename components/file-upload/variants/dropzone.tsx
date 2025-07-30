"use client"

import * as React from "react"
import { FileUpload, type FileUploadProps } from "../index"

export interface FileUploadDropzoneProps extends Omit<FileUploadProps, "variant"> {}

export const FileUploadDropzone = React.forwardRef<HTMLDivElement, FileUploadDropzoneProps>((props, ref) => {
  return <FileUpload {...props} variant="dropzone" ref={ref} />
})

FileUploadDropzone.displayName = "FileUploadDropzone"
