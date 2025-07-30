"use client"

import * as React from "react"
import { FileUpload, type FileUploadConfig, type colorThemes } from "@/components/file-upload"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Eye, Code, Copy, Check, Settings, UploadIcon, ImageIcon, Minimize2, FileText, Grid3X3 } from "lucide-react"
import { cn } from "@/lib/utils"
import dragUIConfig from "@/config/drag-ui-config.json"

interface ComponentGalleryProps {
  onConfigChange: (config: Partial<FileUploadConfig>) => void
  currentConfig: FileUploadConfig
}

const variantIcons = {
  dropzone: Grid3X3,
  button: UploadIcon,
  compact: Minimize2,
  preview: FileText,
  image: ImageIcon,
}

const variantDescriptions = {
  dropzone: "Classic drag-and-drop interface with large drop area",
  button: "Simple button-style upload for minimal interfaces",
  compact: "Space-efficient horizontal layout perfect for forms",
  preview: "Full-featured interface with detailed file management",
  image: "Optimized for image uploads with thumbnail previews",
}

const generateComponentCode = (config: FileUploadConfig) => {
  const configString = JSON.stringify(config, null, 2)
  return `import { FileUpload } from '@your-org/drag-ui'

function MyComponent() {
  const handleFilesChange = (files: File[]) => {
    console.log('Selected files:', files)
  }

  const handleError = (error: string) => {
    console.error('Upload error:', error)
  }

  const config = ${configString}

  return (
    <FileUpload
      config={config}
      onFilesChange={handleFilesChange}
      onError={handleError}
    />
  )
}`
}

export function ComponentGallery({ onConfigChange, currentConfig }: ComponentGalleryProps) {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null)
  const [previewConfig, setPreviewConfig] = React.useState<FileUploadConfig | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
    toast({
      title: "Code Copied",
      description: "Component code has been copied to clipboard",
    })
  }

  const handlePreview = (config: FileUploadConfig) => {
    setPreviewConfig(config)
  }

  const handleApplyConfig = (config: FileUploadConfig) => {
    onConfigChange(config)
    toast({
      title: "Configuration Applied",
      description: `${config.variant} variant configuration has been applied`,
    })
  }

  const allConfigs = [
    // Default variants
    ...Object.entries(dragUIConfig.presets).map(([key, preset]) => ({
      id: key,
      name: key.charAt(0).toUpperCase() + key.slice(1),
      config: preset as FileUploadConfig,
      category: "Presets",
    })),
    // Color theme variations
    ...Object.keys(dragUIConfig.colorThemes).map((theme) => ({
      id: `dropzone-${theme}`,
      name: `Dropzone ${theme.charAt(0).toUpperCase() + theme.slice(1)}`,
      config: {
        ...dragUIConfig.presets.standard,
        colorTheme: theme as keyof typeof colorThemes,
      } as FileUploadConfig,
      category: "Color Themes",
    })),
    // Size variations
    ...["sm", "md", "lg"].map((size) => ({
      id: `dropzone-${size}`,
      name: `Dropzone ${size.toUpperCase()}`,
      config: {
        ...dragUIConfig.presets.standard,
        size: size as "sm" | "md" | "lg",
      } as FileUploadConfig,
      category: "Sizes",
    })),
  ]

  const categories = Array.from(new Set(allConfigs.map((config) => config.category)))

  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <div key={category} className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{category}</h3>
            <Badge variant="outline" className="text-xs">
              {allConfigs.filter((config) => config.category === category).length} variants
            </Badge>
          </div>

          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allConfigs
              .filter((config) => config.category === category)
              .map((item) => {
                const VariantIcon = variantIcons[item.config.variant as keyof typeof variantIcons] || Grid3X3
                const isActive = JSON.stringify(currentConfig) === JSON.stringify(item.config)

                return (
                  <Card
                    key={item.id}
                    className={cn(
                      "group relative overflow-hidden transition-all duration-200 hover:shadow-md",
                      isActive && "ring-2 ring-emerald-500 bg-emerald-50/50",
                    )}
                  >
                    <CardHeader className="p-3 sm:p-4 pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <div
                            className={cn(
                              "w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0",
                              item.config.colorTheme === "emerald" && "bg-emerald-100 text-emerald-600",
                              item.config.colorTheme === "blue" && "bg-blue-100 text-blue-600",
                              item.config.colorTheme === "purple" && "bg-purple-100 text-purple-600",
                              item.config.colorTheme === "orange" && "bg-orange-100 text-orange-600",
                              item.config.colorTheme === "rose" && "bg-rose-100 text-rose-600",
                              item.config.colorTheme === "slate" && "bg-slate-100 text-slate-600",
                              !item.config.colorTheme && "bg-gray-100 text-gray-600",
                            )}
                          >
                            <VariantIcon className="w-3 h-3" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <CardTitle className="text-sm font-medium truncate">{item.name}</CardTitle>
                            <CardDescription className="text-xs truncate">
                              {variantDescriptions[item.config.variant as keyof typeof variantDescriptions]}
                            </CardDescription>
                          </div>
                        </div>

                        {isActive && (
                          <Badge variant="secondary" className="text-xs px-1.5 py-0.5 ml-2">
                            Active
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="p-3 sm:p-4 pt-0">
                      <div className="flex items-center gap-1 mb-3">
                        <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                          {item.config.variant}
                        </Badge>
                        <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                          {item.config.colorTheme || "default"}
                        </Badge>
                        <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                          {item.config.size || "md"}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-1">
                        {/* Preview Button */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 text-xs h-7 bg-transparent"
                              onClick={() => handlePreview(item.config)}
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              Preview
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <VariantIcon className="w-4 h-4" />
                                {item.name} Preview
                              </DialogTitle>
                              <DialogDescription>
                                Interactive preview of the {item.config.variant} variant
                              </DialogDescription>
                            </DialogHeader>
                            <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                              <FileUpload
                                config={item.config}
                                onFilesChange={(files) => console.log("Preview files:", files)}
                                onError={(error) => console.log("Preview error:", error)}
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button onClick={() => handleApplyConfig(item.config)} className="flex-1">
                                <Settings className="w-4 h-4 mr-2" />
                                Apply Configuration
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>

                        {/* Code Button */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="flex-1 text-xs h-7 bg-transparent">
                              <Code className="w-3 h-3 mr-1" />
                              Code
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh]">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <Code className="w-4 h-4" />
                                {item.name} Code
                              </DialogTitle>
                              <DialogDescription>
                                Copy this code to use the {item.config.variant} variant in your project
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="relative">
                                <Textarea
                                  value={generateComponentCode(item.config)}
                                  readOnly
                                  className="min-h-[400px] font-mono text-sm bg-gray-900 text-green-400 border-gray-700"
                                />
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="absolute top-2 right-2 bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                                  onClick={() => copyToClipboard(generateComponentCode(item.config), `code-${item.id}`)}
                                >
                                  {copiedCode === `code-${item.id}` ? (
                                    <Check className="w-3 h-3" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </Button>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => copyToClipboard(generateComponentCode(item.config), `code-${item.id}`)}
                                  className="flex-1"
                                >
                                  <Copy className="w-4 h-4 mr-2" />
                                  Copy Code
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => handleApplyConfig(item.config)}
                                  className="flex-1"
                                >
                                  <Settings className="w-4 h-4 mr-2" />
                                  Apply Config
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        {/* Apply Button */}
                        <Button
                          variant={isActive ? "default" : "outline"}
                          size="sm"
                          className="text-xs h-7 px-2"
                          onClick={() => handleApplyConfig(item.config)}
                          disabled={isActive}
                        >
                          <Settings className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </div>
      ))}
    </div>
  )
}
