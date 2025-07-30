"use client"

import * as React from "react"
import { FileUpload, type FileUploadProps } from "../index"

export interface FileUploadImageProps extends Omit<FileUploadProps, "variant"> {}

export const FileUploadImage = React.forwardRef<HTMLDivElement, FileUploadImageProps>((props, ref) => {
  return <FileUpload {...props} variant="image" ref={ref} />
})

FileUploadImage.displayName = "FileUploadImage"
