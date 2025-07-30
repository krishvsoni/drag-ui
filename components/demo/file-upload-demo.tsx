"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import * as React from "react"
import { FileUpload, type FileUploadConfig, type colorThemes } from "@/components/file-upload"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"
import { ArrowLeft, Eye, Code, Copy, Check, Settings, Play, Download, X } from "lucide-react"

// Import the JSON configuration
import dragUIConfig from "@/config/drag-ui-config.json"

const defaultConfigs: Record<string, FileUploadConfig> = {
  dropzone: dragUIConfig.presets.standard,
  button: dragUIConfig.presets.minimal,
  compact: dragUIConfig.presets.documentUpload,
  preview: dragUIConfig.presets.advanced,
  image: dragUIConfig.presets.imageGallery,
}

const generateComponentCode = (config: FileUploadConfig, componentName = "MyFileUpload") => {
  const configString = JSON.stringify(config, null, 2)
  return `import { 
  FileUploadDropzone,
  FileUploadButton, 
  FileUploadCompact,
  FileUploadPreview,
  FileUploadImage 
} from '@drag-ui/file-upload'

function ${componentName}() {
  const handleFilesChange = (files: File[]) => {
    console.log('Selected files:', files)
    // Handle your files here
  }

  const handleError = (error: string) => {
    console.error('Upload error:', error)
    // Handle errors here
  }

  const handleColorChange = (theme: string) => {
    console.log('Theme changed to:', theme)
    // Handle theme changes here
  }

  const config = ${configString}

  // Choose the appropriate component based on variant
  const Component = {
    dropzone: FileUploadDropzone,
    button: FileUploadButton,
    compact: FileUploadCompact,
    preview: FileUploadPreview,
    image: FileUploadImage
  }[config.variant || 'dropzone']

  return (
    <Component
      config={config}
      onFilesChange={handleFilesChange}
      onError={handleError}
      onColorChange={handleColorChange}
    />
  )
}

export default ${componentName}`
}

const generateJSONConfig = (config: FileUploadConfig) => {
  return JSON.stringify(config, null, 2)
}

const generateInstallationCode = () => {
  return `# Install Drag UI File Upload Components
npm install @drag-ui/file-upload

# Or with yarn
yarn add @drag-ui/file-upload

# Or with pnpm
pnpm add @drag-ui/file-upload

# Install peer dependencies if not already installed
npm install react react-dom @radix-ui/react-label @radix-ui/react-progress`
}

export function FileUploadDemo() {
  const [selectedConfig, setSelectedConfig] = React.useState("dropzone")
  const [customConfig, setCustomConfig] = React.useState("")
  const [liveConfig, setLiveConfig] = React.useState<FileUploadConfig>(defaultConfigs.dropzone)
  const [customizationConfig, setCustomizationConfig] = React.useState<FileUploadConfig>(defaultConfigs.dropzone)
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null)

  const handleFilesChange = (files: File[]) => {
    toast({
      title: "Files Updated",
      description: `${files.length} file(s) selected`,
    })
  }

  const handleError = (error: string) => {
    toast({
      title: "Upload Error",
      description: error,
      variant: "destructive",
    })
  }

  const handleColorChange = (color: keyof typeof colorThemes) => {
    toast({
      title: "Color Changed",
      description: `Theme changed to ${color}`,
    })
  }

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
    toast({
      title: "Code Copied",
      description: "Code has been copied to clipboard",
    })
  }

  const applyCustomConfig = () => {
    try {
      // Check if customConfig is empty or whitespace
      if (!customConfig.trim()) {
        toast({
          title: "Empty Configuration",
          description: "Please enter a JSON configuration",
          variant: "destructive",
        })
        return
      }

      const parsed = JSON.parse(customConfig)
      setLiveConfig({ ...defaultConfigs.dropzone, ...parsed })
      toast({
        title: "Config Applied",
        description: "Custom configuration has been applied successfully",
      })
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: "Please check your JSON syntax and try again",
        variant: "destructive",
      })
    }
  }

  const resetConfig = () => {
    setLiveConfig(defaultConfigs.dropzone)
    setCustomConfig("")
    toast({
      title: "Config Reset",
      description: "Configuration has been reset to default",
    })
  }

  const updateCustomizationConfig = (updates: Partial<FileUploadConfig>) => {
    setCustomizationConfig((prev) => ({ ...prev, ...updates }))
  }

  const loadPreset = (presetName: string) => {
    const preset = (dragUIConfig.presets as any)[presetName]
    if (preset) {
      setCustomConfig(JSON.stringify(preset, null, 2))
      setLiveConfig(preset)
      toast({
        title: "Preset Loaded",
        description: `${presetName} preset has been loaded`,
      })
    }
  }

  const CodeDialog = ({
    trigger,
    title,
    description,
    code,
    config,
    codeId,
  }: {
    trigger: React.ReactNode
    title: string
    description: string
    code: string
    config?: FileUploadConfig
    codeId: string
  }) => (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-2 mb-4">
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(code, codeId)} className="flex-1">
              {copiedCode === codeId ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              Copy Code
            </Button>
            {config && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(generateJSONConfig(config), `${codeId}-json`)}
                className="flex-1"
              >
                {copiedCode === `${codeId}-json` ? (
                  <Check className="w-4 h-4 mr-2" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                Copy JSON
              </Button>
            )}
          </div>
          <div className="relative">
            <Textarea
              value={code}
              readOnly
              className="min-h-[400px] font-mono text-sm bg-gray-900 text-green-400 border-gray-700 resize-none"
            />
            <Button
              size="sm"
              variant="outline"
              className="absolute top-2 right-2 bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
              onClick={() => copyToClipboard(code, codeId)}
            >
              {copiedCode === codeId ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  const PreviewDialog = ({
    trigger,
    title,
    description,
    config,
    onApply,
  }: {
    trigger: React.ReactNode
    title: string
    description: string
    config: FileUploadConfig
    onApply: () => void
  }) => (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
            <FileUpload
              config={config}
              onFilesChange={(files) => console.log("Preview files:", files)}
              onError={(error) => console.log("Preview error:", error)}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={onApply} className="flex-1">
              <Settings className="w-4 h-4 mr-2" />
              Apply Configuration
            </Button>
            <CodeDialog
              trigger={
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Code className="w-4 h-4 mr-2" />
                  View Code
                </Button>
              }
              title={`${title} Code`}
              description={`React component code for ${title.toLowerCase()}`}
              code={generateComponentCode(config, title.replace(/\s+/g, ""))}
              config={config}
              codeId={`preview-${title.replace(/\s+/g, "").toLowerCase()}`}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  // Add a helper function to safely generate code
  const safeGenerateCode = (configString: string, fallbackConfig: FileUploadConfig) => {
    try {
      if (!configString.trim()) {
        return generateComponentCode(fallbackConfig, "JSONConfigUpload")
      }
      const parsed = JSON.parse(configString)
      return generateComponentCode({ ...fallbackConfig, ...parsed }, "JSONConfigUpload")
    } catch (error) {
      return generateComponentCode(fallbackConfig, "JSONConfigUpload")
    }
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <Button variant="outline" size="sm" asChild className="self-start bg-transparent">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
        <div className="text-center sm:text-left space-y-3 sm:space-y-4 flex-1">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Drag UI</span>{" "}
            Demo
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
            Interactive playground for testing all component variants, themes, and JSON configurations
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2">
            <Badge variant="secondary" className="text-xs">
              JSON Configured
            </Badge>
            <Badge variant="secondary" className="text-xs">
              6 Color Themes
            </Badge>
            <Badge variant="secondary" className="text-xs">
              5 Variants
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Fully Accessible
            </Badge>
          </div>
        </div>
      </div>

      <Tabs defaultValue="variants" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-gradient-to-r from-gray-100 to-gray-200 h-auto">
          <TabsTrigger value="variants" className="text-xs sm:text-sm px-2 py-2">
            Component Variants
          </TabsTrigger>
          <TabsTrigger value="customizer" className="text-xs sm:text-sm px-2 py-2">
            Visual Customizer
          </TabsTrigger>
          <TabsTrigger value="config" className="text-xs sm:text-sm px-2 py-2">
            JSON Config Editor
          </TabsTrigger>
          <TabsTrigger value="presets" className="text-xs sm:text-sm px-2 py-2">
            Presets & Themes
          </TabsTrigger>
        </TabsList>

        {/* Component Variants Tab */}
        <TabsContent value="variants" className="space-y-6">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Object.entries(defaultConfigs).map(([key, config]) => (
              <Card key={key} className="space-y-4 bg-gradient-to-br from-white to-gray-50 border-2">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg p-4 sm:p-6">
                  <CardTitle className="capitalize flex items-center gap-2 text-base sm:text-lg">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        config.colorTheme === "emerald"
                          ? "bg-emerald-500"
                          : config.colorTheme === "blue"
                            ? "bg-blue-500"
                            : config.colorTheme === "purple"
                              ? "bg-purple-500"
                              : config.colorTheme === "orange"
                                ? "bg-orange-500"
                                : config.colorTheme === "rose"
                                  ? "bg-rose-500"
                                  : "bg-gray-500"
                      }`}
                    />
                    {key} Variant
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {key === "dropzone" && "Classic drag-and-drop interface with file preview"}
                    {key === "button" && "Simple button-style upload for single files"}
                    {key === "compact" && "Space-efficient design for forms"}
                    {key === "preview" && "Full-featured with detailed file management"}
                    {key === "image" && "Optimized for image uploads with preview"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4">
                  <FileUpload
                    config={config}
                    onFilesChange={handleFilesChange}
                    onError={handleError}
                    onColorChange={handleColorChange}
                  />

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <PreviewDialog
                      trigger={
                        <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                          <Eye className="w-3 h-3 mr-1" />
                          Preview
                        </Button>
                      }
                      title={`${key.charAt(0).toUpperCase() + key.slice(1)} Variant`}
                      description={`Interactive preview of the ${key} variant`}
                      config={config}
                      onApply={() => {
                        setCustomizationConfig(config)
                        toast({
                          title: "Configuration Applied",
                          description: `${key} variant configuration applied to customizer`,
                        })
                      }}
                    />

                    <CodeDialog
                      trigger={
                        <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                          <Code className="w-3 h-3 mr-1" />
                          Code
                        </Button>
                      }
                      title={`${key.charAt(0).toUpperCase() + key.slice(1)} Variant Code`}
                      description={`React component code for the ${key} variant`}
                      code={generateComponentCode(config, `${key.charAt(0).toUpperCase() + key.slice(1)}Upload`)}
                      config={config}
                      codeId={`variant-${key}`}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Visual Customizer Tab */}
        <TabsContent value="customizer" className="space-y-6">
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            <Card className="bg-gradient-to-br from-white to-blue-50">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Visual Customizer</CardTitle>
                <CardDescription className="text-sm">
                  Customize the component appearance with visual controls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                <div className="grid gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label>Variant</Label>
                    <Select
                      value={customizationConfig.variant}
                      onValueChange={(value) => updateCustomizationConfig({ variant: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dropzone">Dropzone</SelectItem>
                        <SelectItem value="button">Button</SelectItem>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="preview">Preview</SelectItem>
                        <SelectItem value="image">Image</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Color Theme</Label>
                    <Select
                      value={customizationConfig.colorTheme}
                      onValueChange={(value) => updateCustomizationConfig({ colorTheme: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(dragUIConfig.colorThemes).map(([key, theme]) => (
                          <SelectItem key={key} value={key}>
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: theme.primary }} />
                              {theme.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Size</Label>
                    <Select
                      value={customizationConfig.size}
                      onValueChange={(value) => updateCustomizationConfig({ size: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sm">Small</SelectItem>
                        <SelectItem value="md">Medium</SelectItem>
                        <SelectItem value="lg">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Border Radius</Label>
                    <Select
                      value={customizationConfig.radius}
                      onValueChange={(value) => updateCustomizationConfig({ radius: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="sm">Small</SelectItem>
                        <SelectItem value="md">Medium</SelectItem>
                        <SelectItem value="lg">Large</SelectItem>
                        <SelectItem value="xl">Extra Large</SelectItem>
                        <SelectItem value="full">Full</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="show-progress"
                      checked={customizationConfig.showProgress}
                      onCheckedChange={(checked) => updateCustomizationConfig({ showProgress: checked })}
                    />
                    <Label htmlFor="show-progress">Show Progress</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="show-preview"
                      checked={customizationConfig.showPreview}
                      onCheckedChange={(checked) => updateCustomizationConfig({ showPreview: checked })}
                    />
                    <Label htmlFor="show-preview">Show Preview</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="show-color-picker"
                      checked={customizationConfig.showColorPicker}
                      onCheckedChange={(checked) => updateCustomizationConfig({ showColorPicker: checked })}
                    />
                    <Label htmlFor="show-color-picker">Show Color Picker</Label>
                  </div>
                </div>

                {/* Customizer Action Buttons */}
                <div className="flex gap-2 pt-4 border-t">
                  <CodeDialog
                    trigger={
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Code className="w-4 h-4 mr-2" />
                        Get Code
                      </Button>
                    }
                    title="Custom Configuration Code"
                    description="React component code for your custom configuration"
                    code={generateComponentCode(customizationConfig, "CustomFileUpload")}
                    config={customizationConfig}
                    codeId="customizer-config"
                  />
                  <Button
                    onClick={() => copyToClipboard(generateJSONConfig(customizationConfig), "customizer-json")}
                    variant="outline"
                    className="flex-1"
                  >
                    {copiedCode === "customizer-json" ? (
                      <Check className="w-4 h-4 mr-2" />
                    ) : (
                      <Download className="w-4 h-4 mr-2" />
                    )}
                    Export JSON
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-purple-50">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Live Preview</CardTitle>
                <CardDescription className="text-sm">See your customizations in real-time</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <FileUpload
                  config={customizationConfig}
                  onFilesChange={handleFilesChange}
                  onError={handleError}
                  onColorChange={handleColorChange}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* JSON Config Editor Tab */}
        <TabsContent value="config" className="space-y-6">
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            <Card className="bg-gradient-to-br from-white to-green-50">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">JSON Configuration Editor</CardTitle>
                <CardDescription className="text-sm">
                  Edit the JSON configuration below to see real-time changes in the component
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-4 sm:p-6">
                <Textarea
                  placeholder="Enter JSON configuration..."
                  value={customConfig}
                  onChange={(e) => setCustomConfig(e.target.value)}
                  className="min-h-[250px] sm:min-h-[300px] font-mono text-xs sm:text-sm bg-gradient-to-br from-gray-50 to-gray-100"
                />
                {/* JSON Validation Indicator */}
                {customConfig && (
                  <div className="flex items-center gap-2 text-sm">
                    {(() => {
                      try {
                        if (!customConfig.trim()) return null
                        JSON.parse(customConfig)
                        return (
                          <div className="flex items-center gap-1 text-green-600">
                            <Check className="w-4 h-4" />
                            Valid JSON
                          </div>
                        )
                      } catch (error) {
                        return (
                          <div className="flex items-center gap-1 text-red-600">
                            <X className="w-4 h-4" />
                            Invalid JSON: {error instanceof Error ? error.message : "Syntax error"}
                          </div>
                        )
                      }
                    })()}
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    onClick={applyCustomConfig}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 w-full sm:w-auto"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Apply Config
                  </Button>
                  <Button variant="outline" onClick={resetConfig} className="w-full sm:w-auto bg-transparent">
                    Reset
                  </Button>
                  <CodeDialog
                    trigger={
                      <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                        <Code className="w-4 h-4 mr-2" />
                        Generate Code
                      </Button>
                    }
                    title="JSON Configuration Code"
                    description="React component code generated from your JSON configuration"
                    code={safeGenerateCode(customConfig, liveConfig)}
                    config={liveConfig}
                    codeId="json-config"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm sm:text-base">Load Preset:</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const sampleConfig = JSON.stringify(dragUIConfig.presets.standard, null, 2)
                        setCustomConfig(sampleConfig)
                        toast({
                          title: "Sample Loaded",
                          description: "Sample JSON configuration has been loaded",
                        })
                      }}
                      className="text-xs"
                    >
                      Load Sample JSON
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(dragUIConfig.presets).map((presetName) => (
                      <Button
                        key={presetName}
                        variant="outline"
                        size="sm"
                        onClick={() => loadPreset(presetName)}
                        className="bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-xs"
                      >
                        {presetName}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Installation Instructions */}
                <div className="pt-4 border-t">
                  <h4 className="font-medium text-sm sm:text-base mb-2">Installation:</h4>
                  <CodeDialog
                    trigger={
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <Download className="w-4 h-4 mr-2" />
                        View Installation Instructions
                      </Button>
                    }
                    title="Installation Instructions"
                    description="How to install and set up Drag UI in your project"
                    code={generateInstallationCode()}
                    codeId="installation"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-orange-50">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Live Preview</CardTitle>
                <CardDescription className="text-sm">
                  This component updates in real-time based on your configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <FileUpload
                  config={liveConfig}
                  onFilesChange={handleFilesChange}
                  onError={handleError}
                  onColorChange={handleColorChange}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Presets & Themes Tab */}
        <TabsContent value="presets" className="space-y-6">
          <div className="grid gap-4 sm:gap-6">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Configuration Presets</CardTitle>
                <CardDescription className="text-sm">Pre-built configurations for common use cases</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Object.entries(dragUIConfig.presets).map(([presetName, preset]) => (
                    <Card key={presetName} className="bg-gradient-to-br from-white to-gray-50">
                      <CardHeader className="p-3 sm:p-4">
                        <CardTitle className="capitalize text-base sm:text-lg">{presetName}</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                          {presetName === "minimal" && "Simple button upload for basic needs"}
                          {presetName === "standard" && "Default dropzone with all features"}
                          {presetName === "advanced" && "Full-featured preview with large file support"}
                          {presetName === "imageGallery" && "Optimized for image collections"}
                          {presetName === "documentUpload" && "Compact design for document uploads"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-3 sm:p-4">
                        <div className="space-y-2 text-xs sm:text-sm mb-3">
                          <div className="flex justify-between items-center">
                            <span>Variant:</span>
                            <Badge variant="outline" className="text-xs">
                              {preset.variant}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Theme:</span>
                            <Badge variant="outline" className="text-xs">
                              {preset.colorTheme}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Max Size:</span>
                            <span>{(preset.maxFileSize! / 1024 / 1024).toFixed(0)}MB</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Max Files:</span>
                            <span>{preset.maxFiles}</span>
                          </div>
                        </div>

                        {/* Preset Action Buttons */}
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 bg-transparent text-xs"
                            onClick={() => loadPreset(presetName)}
                          >
                            Load
                          </Button>
                          <PreviewDialog
                            trigger={
                              <Button size="sm" variant="outline" className="flex-1 bg-transparent text-xs">
                                <Eye className="w-3 h-3 mr-1" />
                                Preview
                              </Button>
                            }
                            title={`${presetName.charAt(0).toUpperCase() + presetName.slice(1)} Preset`}
                            description={`Interactive preview of the ${presetName} preset configuration`}
                            config={preset as FileUploadConfig}
                            onApply={() => {
                              loadPreset(presetName)
                              setCustomizationConfig(preset as FileUploadConfig)
                            }}
                          />
                          <CodeDialog
                            trigger={
                              <Button size="sm" variant="outline" className="flex-1 bg-transparent text-xs">
                                <Code className="w-3 h-3 mr-1" />
                                Code
                              </Button>
                            }
                            title={`${presetName.charAt(0).toUpperCase() + presetName.slice(1)} Preset Code`}
                            description={`React component code for the ${presetName} preset`}
                            code={generateComponentCode(
                              preset as FileUploadConfig,
                              `${presetName.charAt(0).toUpperCase() + presetName.slice(1)}Upload`,
                            )}
                            config={preset as FileUploadConfig}
                            codeId={`preset-${presetName}`}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Color Themes</CardTitle>
                <CardDescription className="text-sm">Available color themes with gradient backgrounds</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Object.entries(dragUIConfig.colorThemes).map(([themeName, theme]) => {
                    const themeConfig = {
                      ...dragUIConfig.presets.standard,
                      colorTheme: themeName as keyof typeof colorThemes,
                    } as FileUploadConfig

                    return (
                      <Card key={themeName} className="bg-gradient-to-br from-white to-gray-50">
                        <CardHeader className="p-3 sm:p-4">
                          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                            <div
                              className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                              style={{ backgroundColor: theme.primary }}
                            />
                            {theme.name}
                          </CardTitle>
                          <CardDescription className="text-xs sm:text-sm">{theme.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-3 sm:p-4">
                          <div className="space-y-1 sm:space-y-2 mb-3">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                                style={{ backgroundColor: theme.primary }}
                              />
                              <span className="text-xs">Primary: {theme.primary}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                                style={{ backgroundColor: theme.secondary }}
                              />
                              <span className="text-xs">Secondary: {theme.secondary}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                                style={{ backgroundColor: theme.accent }}
                              />
                              <span className="text-xs">Accent: {theme.accent}</span>
                            </div>
                          </div>

                          {/* Theme Action Buttons */}
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 bg-transparent text-xs"
                              onClick={() => {
                                setCustomizationConfig(themeConfig)
                                toast({
                                  title: "Theme Applied",
                                  description: `${theme.name} theme applied to customizer`,
                                })
                              }}
                            >
                              Apply
                            </Button>
                            <PreviewDialog
                              trigger={
                                <Button size="sm" variant="outline" className="flex-1 bg-transparent text-xs">
                                  <Eye className="w-3 h-3 mr-1" />
                                  Preview
                                </Button>
                              }
                              title={`${theme.name} Theme`}
                              description={`Interactive preview of the ${theme.name.toLowerCase()} color theme`}
                              config={themeConfig}
                              onApply={() => {
                                setCustomizationConfig(themeConfig)
                                toast({
                                  title: "Theme Applied",
                                  description: `${theme.name} theme applied to customizer`,
                                })
                              }}
                            />
                            <CodeDialog
                              trigger={
                                <Button size="sm" variant="outline" className="flex-1 bg-transparent text-xs">
                                  <Code className="w-3 h-3 mr-1" />
                                  Code
                                </Button>
                              }
                              title={`${theme.name} Theme Code`}
                              description={`React component code using the ${theme.name.toLowerCase()} theme`}
                              code={generateComponentCode(themeConfig, `${theme.name}Upload`)}
                              config={themeConfig}
                              codeId={`theme-${themeName}`}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
