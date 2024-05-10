
//configs for dark theme module

'use client'

import { ThemeProvider } from 'next-themes'

export function Providers({ children }) {
  return <ThemeProvider storageKey = 'theme'>{children}</ThemeProvider>
}