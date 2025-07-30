"use client"

import * as React from "react"
import { FileUpload, type FileUploadProps } from "../index"

export interface FileUploadPreviewProps extends Omit<FileUploadProps, "variant"> {}

export const FileUploadPreview = React.forwardRef<HTMLDivElement, FileUploadPreviewProps>((props, ref) => {
  return <FileUpload {...props} variant="preview" ref={ref} />
})

FileUploadPreview.displayName = "FileUploadPreview"
