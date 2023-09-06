"use client";

import React from "react";

/* next-auth */
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from 'next-themes'

export default function Provider({ children }: { children: React.ReactNode }) {
  
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return(
    <>
      <ThemeProvider attribute="class" defaultTheme="light">
        <SessionProvider>
          {children}
        </SessionProvider>
      </ThemeProvider>
    </>
  )

}
