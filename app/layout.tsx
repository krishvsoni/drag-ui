import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Drag-UI',
  description: 'Build beautiful, accessible file upload interfaces with drag-and-drop, multiple themes, and JSON-driven configuration. Perfect for modern web applications.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} ${GeistMono.variable}`}>{children}</body>
    </html>
  )
}
