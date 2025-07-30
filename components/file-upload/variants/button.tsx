"use client"

import * as React from "react"
import { FileUpload, type FileUploadProps } from "../index"

export interface FileUploadButtonProps extends Omit<FileUploadProps, "variant"> {}

export const FileUploadButton = React.forwardRef<HTMLDivElement, FileUploadButtonProps>((props, ref) => {
  return <FileUpload {...props} variant="button" ref={ref} />
})

FileUploadButton.displayName = "FileUploadButton"
