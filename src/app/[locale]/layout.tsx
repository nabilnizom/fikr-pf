import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Potential Forge',
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <html lang={locale}>
      <body className={`${inter.className} bg-slate-200`}>
        <Suspense fallback={<>Loading..</>}>{children}</Suspense>
      </body>
    </html>
  )
}
