import * as React from "react";
import { type VariantProps } from "class-variance-authority";
export declare const colorThemes: {
    emerald: {
        primary: string;
        secondary: string;
        accent: string;
        text: string;
        border: string;
        gradient: string;
    };
    blue: {
        primary: string;
        secondary: string;
        accent: string;
        text: string;
        border: string;
        gradient: string;
    };
    purple: {
        primary: string;
        secondary: string;
        accent: string;
        text: string;
        border: string;
        gradient: string;
    };
    orange: {
        primary: string;
        secondary: string;
        accent: string;
        text: string;
        border: string;
        gradient: string;
    };
    rose: {
        primary: string;
        secondary: string;
        accent: string;
        text: string;
        border: string;
        gradient: string;
    };
    slate: {
        primary: string;
        secondary: string;
        accent: string;
        text: string;
        border: string;
        gradient: string;
    };
};
declare const fileUploadVariants: (props?: {
    variant?: "button" | "image" | "dropzone" | "compact" | "preview";
    size?: "sm" | "lg" | "md";
    radius?: "sm" | "lg" | "none" | "md" | "xl" | "full";
} & import("class-variance-authority/dist/types").ClassProp) => string;
export interface FileUploadConfig {
    variant?: "button" | "dropzone" | "compact" | "preview" | "image";
    size?: "sm" | "md" | "lg";
    radius?: "none" | "sm" | "md" | "lg" | "xl" | "full";
    colorTheme?: keyof typeof colorThemes;
    maxFileSize?: number;
    maxFiles?: number;
    acceptedFileTypes?: string[];
    labels?: {
        uploadText?: string;
        dragText?: string;
        browseText?: string;
        errorText?: string;
        successText?: string;
    };
    showProgress?: boolean;
    showPreview?: boolean;
    disabled?: boolean;
    showColorPicker?: boolean;
}
export interface FileUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onError'>, VariantProps<typeof fileUploadVariants> {
    config: FileUploadConfig;
    onFilesChange: (files: File[]) => void;
    onError?: (error: string) => void;
    onColorChange?: (theme: keyof typeof colorThemes) => void;
    value?: File[];
    className?: string;
}
export declare const FileUpload: React.ForwardRefExoticComponent<FileUploadProps & React.RefAttributes<HTMLDivElement>>;
export { fileUploadVariants };
export interface FileUploadDropzoneProps extends Omit<FileUploadProps, "variant"> {
}
export declare const FileUploadDropzone: React.ForwardRefExoticComponent<FileUploadDropzoneProps & React.RefAttributes<HTMLDivElement>>;
export interface FileUploadButtonProps extends Omit<FileUploadProps, "variant"> {
}
export declare const FileUploadButton: React.ForwardRefExoticComponent<FileUploadButtonProps & React.RefAttributes<HTMLDivElement>>;
export interface FileUploadCompactProps extends Omit<FileUploadProps, "variant"> {
}
export declare const FileUploadCompact: React.ForwardRefExoticComponent<FileUploadCompactProps & React.RefAttributes<HTMLDivElement>>;
export interface FileUploadPreviewProps extends Omit<FileUploadProps, "variant"> {
}
export declare const FileUploadPreview: React.ForwardRefExoticComponent<FileUploadPreviewProps & React.RefAttributes<HTMLDivElement>>;
export interface FileUploadImageProps extends Omit<FileUploadProps, "variant"> {
}
export declare const FileUploadImage: React.ForwardRefExoticComponent<FileUploadImageProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=index.d.ts.map