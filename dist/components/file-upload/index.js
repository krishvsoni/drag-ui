"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { Upload, X, File, ImageIcon, Check, AlertCircle, Palette } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
// Color themes
export const colorThemes = {
    emerald: {
        primary: "bg-emerald-600 hover:bg-emerald-700 border-emerald-600",
        secondary: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200",
        accent: "bg-emerald-100/50 border-emerald-300",
        text: "text-emerald-700",
        border: "border-emerald-300 hover:border-emerald-400",
        gradient: "bg-gradient-to-br from-emerald-50 to-emerald-100",
    },
    blue: {
        primary: "bg-blue-600 hover:bg-blue-700 border-blue-600",
        secondary: "bg-blue-50 hover:bg-blue-100 border-blue-200",
        accent: "bg-blue-100/50 border-blue-300",
        text: "text-blue-700",
        border: "border-blue-300 hover:border-blue-400",
        gradient: "bg-gradient-to-br from-blue-50 to-blue-100",
    },
    purple: {
        primary: "bg-purple-600 hover:bg-purple-700 border-purple-600",
        secondary: "bg-purple-50 hover:bg-purple-100 border-purple-200",
        accent: "bg-purple-100/50 border-purple-300",
        text: "text-purple-700",
        border: "border-purple-300 hover:border-purple-400",
        gradient: "bg-gradient-to-br from-purple-50 to-purple-100",
    },
    orange: {
        primary: "bg-orange-600 hover:bg-orange-700 border-orange-600",
        secondary: "bg-orange-50 hover:bg-orange-100 border-orange-200",
        accent: "bg-orange-100/50 border-orange-300",
        text: "text-orange-700",
        border: "border-orange-300 hover:border-orange-400",
        gradient: "bg-gradient-to-br from-orange-50 to-orange-100",
    },
    rose: {
        primary: "bg-rose-600 hover:bg-rose-700 border-rose-600",
        secondary: "bg-rose-50 hover:bg-rose-100 border-rose-200",
        accent: "bg-rose-100/50 border-rose-300",
        text: "text-rose-700",
        border: "border-rose-300 hover:border-rose-400",
        gradient: "bg-gradient-to-br from-rose-50 to-rose-100",
    },
    slate: {
        primary: "bg-slate-600 hover:bg-slate-700 border-slate-600",
        secondary: "bg-slate-50 hover:bg-slate-100 border-slate-200",
        accent: "bg-slate-100/50 border-slate-300",
        text: "text-slate-700",
        border: "border-slate-300 hover:border-slate-400",
        gradient: "bg-gradient-to-br from-slate-50 to-slate-100",
    },
};
// File upload variants using CVA
const fileUploadVariants = cva("relative overflow-hidden transition-all duration-200 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2", {
    variants: {
        variant: {
            button: "inline-flex items-center justify-center",
            dropzone: "border-2 border-dashed rounded-lg p-4 sm:p-6 lg:p-8 text-center",
            compact: "border rounded-md p-3 sm:p-4",
            preview: "border rounded-lg p-4 sm:p-6 space-y-3 sm:space-y-4",
            image: "border-2 border-dashed rounded-lg p-4 sm:p-6 lg:p-8 text-center",
        },
        size: {
            sm: "text-xs sm:text-sm",
            md: "text-sm sm:text-base",
            lg: "text-base sm:text-lg",
        },
        radius: {
            none: "rounded-none",
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            full: "rounded-full",
        },
    },
    defaultVariants: {
        variant: "dropzone",
        size: "md",
        radius: "lg",
    },
});
export const FileUpload = React.forwardRef(({ className, variant, size, radius, config, onFilesChange, onError, onColorChange, value = [], ...props }, ref) => {
    const [files, setFiles] = React.useState([]);
    const [isDragOver, setIsDragOver] = React.useState(false);
    const [currentTheme, setCurrentTheme] = React.useState(config?.colorTheme || "emerald");
    const fileInputRef = React.useRef(null);
    // Merge config with props
    const mergedConfig = {
        variant: variant || config?.variant || "dropzone",
        size: size || config?.size || "md",
        radius: radius || config?.radius || "lg",
        colorTheme: currentTheme,
        maxFileSize: config?.maxFileSize || 10 * 1024 * 1024, // 10MB
        maxFiles: config?.maxFiles || 5,
        acceptedFileTypes: config?.acceptedFileTypes || ["image/*", ".pdf", ".doc", ".docx"],
        labels: {
            uploadText: "Upload files",
            dragText: "Drag and drop files here",
            browseText: "Browse files",
            errorText: "Error uploading file",
            successText: "Upload successful",
            ...config?.labels,
        },
        showProgress: config?.showProgress ?? true,
        showPreview: config?.showPreview ?? true,
        disabled: config?.disabled || false,
        showColorPicker: config?.showColorPicker ?? true,
    };
    const theme = colorThemes[currentTheme];
    const validateFile = (file) => {
        if (file.size > mergedConfig.maxFileSize) {
            return `File size must be less than ${(mergedConfig.maxFileSize / 1024 / 1024).toFixed(1)}MB`;
        }
        const isValidType = mergedConfig.acceptedFileTypes.some((type) => {
            if (type.startsWith(".")) {
                return file.name.toLowerCase().endsWith(type.toLowerCase());
            }
            return file.type.match(type.replace("*", ".*"));
        });
        if (!isValidType) {
            return `File type not supported. Accepted types: ${mergedConfig.acceptedFileTypes.join(", ")}`;
        }
        return null;
    };
    const createFilePreview = (file) => {
        if (file.type.startsWith("image/")) {
            return URL.createObjectURL(file);
        }
        return "";
    };
    const processFiles = (fileList) => {
        const newFiles = [];
        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            const error = validateFile(file);
            if (error) {
                onError?.(error);
                continue;
            }
            if (files.length + newFiles.length >= mergedConfig.maxFiles) {
                onError?.(`Maximum ${mergedConfig.maxFiles} files allowed`);
                break;
            }
            const fileWithPreview = Object.assign(file, {
                id: `${Date.now()}-${i}`,
                preview: createFilePreview(file),
                progress: 0,
                status: "uploading",
            });
            newFiles.push(fileWithPreview);
        }
        if (newFiles.length > 0) {
            const updatedFiles = [...files, ...newFiles];
            setFiles(updatedFiles);
            onFilesChange?.(updatedFiles);
            // Simulate upload progress
            newFiles.forEach((file, index) => {
                simulateUpload(files.length + index);
            });
        }
    };
    const simulateUpload = (fileIndex) => {
        const interval = setInterval(() => {
            setFiles((prev) => {
                const updated = [...prev];
                if (updated[fileIndex]) {
                    updated[fileIndex].progress = Math.min((updated[fileIndex].progress || 0) + 10, 100);
                    if (updated[fileIndex].progress === 100) {
                        updated[fileIndex].status = "success";
                        clearInterval(interval);
                    }
                }
                return updated;
            });
        }, 200);
    };
    const removeFile = (index) => {
        const fileToRemove = files[index];
        if (fileToRemove?.preview) {
            URL.revokeObjectURL(fileToRemove.preview);
        }
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
        onFilesChange?.(updatedFiles);
    };
    const handleColorChange = (newTheme) => {
        setCurrentTheme(newTheme);
        onColorChange?.(newTheme);
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };
    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        if (mergedConfig.disabled)
            return;
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
            processFiles(droppedFiles);
        }
    };
    const handleFileSelect = (e) => {
        const selectedFiles = e.target.files;
        if (selectedFiles && selectedFiles.length > 0) {
            processFiles(selectedFiles);
        }
    };
    const openFileDialog = () => {
        if (!mergedConfig.disabled) {
            fileInputRef.current?.click();
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openFileDialog();
        }
    };
    const renderColorPicker = () => {
        if (!mergedConfig.showColorPicker)
            return null;
        return (_jsx("div", { className: "absolute top-1 right-1 sm:top-2 sm:right-2 z-10", children: _jsxs("div", { className: "flex items-center gap-1 p-1 bg-white/90 backdrop-blur-sm rounded-lg border shadow-sm", children: [_jsx(Palette, { className: "w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-500" }), Object.keys(colorThemes).map((themeName) => (_jsx("button", { onClick: () => handleColorChange(themeName), className: cn("w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 transition-all hover:scale-110", currentTheme === themeName ? "border-gray-800 scale-110" : "border-gray-300", themeName === "emerald" && "bg-emerald-500", themeName === "blue" && "bg-blue-500", themeName === "purple" && "bg-purple-500", themeName === "orange" && "bg-orange-500", themeName === "rose" && "bg-rose-500", themeName === "slate" && "bg-slate-500"), title: `${themeName} theme` }, themeName)))] }) }));
    };
    const renderFilePreview = (file, index) => (_jsxs("div", { className: cn("flex items-center gap-2 sm:gap-3 p-2 sm:p-3 border rounded-lg", theme.secondary), children: [_jsx("div", { className: "flex-shrink-0", children: file.type.startsWith("image/") ? (file.preview ? (_jsx("div", { className: "relative", children: _jsx("img", { src: file.preview || "/placeholder.svg", alt: file.name, className: "w-8 h-8 sm:w-12 sm:h-12 object-cover rounded border", onLoad: () => {
                            // Image loaded successfully
                        }, onError: () => {
                            console.error("Failed to load image preview");
                        } }) })) : (_jsx(ImageIcon, { className: "w-8 h-8 sm:w-12 sm:h-12 text-gray-400" }))) : (_jsx("div", { className: cn("w-8 h-8 sm:w-12 sm:h-12 rounded flex items-center justify-center", theme.accent), children: _jsx(File, { className: "w-4 h-4 sm:w-6 sm:h-6 text-gray-600" }) })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-xs sm:text-sm font-medium truncate", children: file.name }), _jsxs("p", { className: "text-xs text-gray-500", children: [(file.size / 1024 / 1024).toFixed(2), " MB"] }), mergedConfig.showProgress && file.status === "uploading" && (_jsx("div", { className: "mt-1 sm:mt-2", children: _jsx(Progress, { value: file.progress || 0, className: "h-1" }) }))] }), _jsxs("div", { className: "flex items-center gap-1 sm:gap-2", children: [file.status === "success" && _jsx(Check, { className: "w-3 h-3 sm:w-4 sm:h-4 text-green-600" }), file.status === "error" && _jsx(AlertCircle, { className: "w-3 h-3 sm:w-4 sm:h-4 text-red-600" }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => removeFile(index), className: "h-6 w-6 sm:h-8 sm:w-8 p-0 hover:bg-red-100 hover:text-red-600", children: _jsx(X, { className: "w-3 h-3 sm:w-4 sm:h-4" }) })] })] }, file.id || index));
    const renderContent = () => {
        switch (mergedConfig.variant) {
            case "button":
                return (_jsxs(Button, { onClick: openFileDialog, disabled: mergedConfig.disabled, className: cn("gap-2 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-3", theme.primary, "text-white"), children: [_jsx(Upload, { className: "w-3 h-3 sm:w-4 sm:h-4" }), mergedConfig.labels?.uploadText] }));
            case "compact":
                return (_jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: openFileDialog, disabled: mergedConfig.disabled, className: cn("gap-2 text-xs sm:text-sm w-full sm:w-auto", theme.border), children: [_jsx(Upload, { className: "w-3 h-3 sm:w-4 sm:h-4" }), mergedConfig.labels?.browseText] }), _jsx("span", { className: "text-xs sm:text-sm text-gray-600 text-center sm:text-left", children: files.length > 0 ? `${files.length} file(s) selected` : mergedConfig.labels?.dragText })] }));
            case "preview":
                return (_jsxs("div", { className: "space-y-3 sm:space-y-4", children: [_jsxs("div", { className: cn("border-2 border-dashed rounded-lg p-4 sm:p-6 text-center cursor-pointer transition-all", theme.border, theme.gradient, isDragOver && theme.accent, mergedConfig.disabled && "opacity-50 cursor-not-allowed"), onClick: openFileDialog, children: [_jsx(Upload, { className: cn("w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2", theme.text) }), _jsx("p", { className: cn("text-sm sm:text-base font-medium", theme.text), children: mergedConfig.labels?.uploadText }), _jsx("p", { className: "text-xs sm:text-sm text-gray-500 mt-1", children: mergedConfig.labels?.dragText })] }), files.length > 0 && (_jsx("div", { className: "space-y-2", children: files.map((file, index) => renderFilePreview(file, index)) }))] }));
            case "image":
                return (_jsxs("div", { className: "text-center", children: [_jsx(ImageIcon, { className: cn("w-8 h-8 sm:w-12 sm:w-12 mx-auto mb-3 sm:mb-4", theme.text) }), _jsx("p", { className: cn("text-sm sm:text-base font-medium mb-1", theme.text), children: mergedConfig.labels?.uploadText }), _jsx("p", { className: "text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4", children: mergedConfig.labels?.dragText }), _jsxs(Button, { variant: "outline", onClick: openFileDialog, disabled: mergedConfig.disabled, className: cn("gap-2 text-xs sm:text-sm", theme.border), children: [_jsx(Upload, { className: "w-3 h-3 sm:w-4 sm:h-4" }), mergedConfig.labels?.browseText] })] }));
            default: // dropzone
                return (_jsxs("div", { className: "text-center", children: [_jsx(Upload, { className: cn("w-8 h-8 sm:w-12 sm:w-12 mx-auto mb-3 sm:mb-4", theme.text) }), _jsx("p", { className: cn("text-base sm:text-lg font-medium mb-1", theme.text), children: mergedConfig.labels?.uploadText }), _jsx("p", { className: "text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4", children: mergedConfig.labels?.dragText }), _jsxs(Button, { variant: "outline", onClick: openFileDialog, disabled: mergedConfig.disabled, className: cn("gap-2 text-xs sm:text-sm", theme.border), children: [_jsx(Upload, { className: "w-3 h-3 sm:w-4 sm:h-4" }), mergedConfig.labels?.browseText] })] }));
        }
    };
    // Cleanup effect for object URLs
    React.useEffect(() => {
        return () => {
            files.forEach((file) => {
                if (file.preview) {
                    URL.revokeObjectURL(file.preview);
                }
            });
        };
    }, []);
    return (_jsxs("div", { ref: ref, className: cn(fileUploadVariants({ variant: mergedConfig.variant, size: mergedConfig.size, radius: mergedConfig.radius }), theme.gradient, theme.border, isDragOver && theme.accent, mergedConfig.disabled && "opacity-50 cursor-not-allowed", mergedConfig.variant !== "button" && mergedConfig.variant !== "preview" && "cursor-pointer", className), onDragOver: handleDragOver, onDragLeave: handleDragLeave, onDrop: handleDrop, onClick: mergedConfig.variant !== "button" && mergedConfig.variant !== "preview" ? openFileDialog : undefined, onKeyDown: handleKeyDown, tabIndex: mergedConfig.disabled ? -1 : 0, role: "button", "aria-label": mergedConfig.labels?.uploadText, "aria-disabled": mergedConfig.disabled, ...props, children: [_jsx("input", { ref: fileInputRef, type: "file", multiple: mergedConfig.maxFiles > 1, accept: mergedConfig.acceptedFileTypes?.join(","), onChange: handleFileSelect, className: "sr-only", disabled: mergedConfig.disabled }), renderColorPicker(), renderContent()] }));
});
FileUpload.displayName = "FileUpload";
export { fileUploadVariants };
export const FileUploadDropzone = React.forwardRef((props, ref) => {
    return _jsx(FileUpload, { ...props, variant: "dropzone", ref: ref });
});
FileUploadDropzone.displayName = "FileUploadDropzone";
export const FileUploadButton = React.forwardRef((props, ref) => {
    return _jsx(FileUpload, { ...props, variant: "button", ref: ref });
});
FileUploadButton.displayName = "FileUploadButton";
export const FileUploadCompact = React.forwardRef((props, ref) => {
    return _jsx(FileUpload, { ...props, variant: "compact", ref: ref });
});
FileUploadCompact.displayName = "FileUploadCompact";
export const FileUploadPreview = React.forwardRef((props, ref) => {
    return _jsx(FileUpload, { ...props, variant: "preview", ref: ref });
});
FileUploadPreview.displayName = "FileUploadPreview";
export const FileUploadImage = React.forwardRef((props, ref) => {
    return _jsx(FileUpload, { ...props, variant: "image", ref: ref });
});
FileUploadImage.displayName = "FileUploadImage";
//# sourceMappingURL=index.js.map