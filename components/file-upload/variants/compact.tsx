"use client"

import * as React from "react"
import { FileUpload, type FileUploadProps } from "../index"

export interface FileUploadCompactProps extends Omit<FileUploadProps, "variant"> {}

export const FileUploadCompact = React.forwardRef<HTMLDivElement, FileUploadCompactProps>((props, ref) => {
  return <FileUpload {...props} variant="compact" ref={ref} />
})

FileUploadCompact.displayName = "FileUploadCompact"
