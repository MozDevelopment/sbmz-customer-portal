import type { Metadata } from 'next'
import '../app/[locale]/globals.css'
import '../app/[locale]/shadcn.css'

import { Toaster } from 'sonner'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
// Import the font file
import localFont from 'next/font/local'

// Define the custom font
const bentonSans = localFont({
  src: [
    {
      path: '../app/fonts/BentonSans/BentonSans-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../app/fonts/BentonSans/BentonSans-Medium.otf',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-benton-sans',
})

export const metadata: Metadata = {
  title: 'SBMZ Self Service',
  description: 'Standard Bank Self Service App',
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  const messages = await getMessages()

  return (
    <html lang={locale} className={`${bentonSans.variable} font-sans`}>
      <body className="flex min-h-screen flex-col bg-white text-gray-900">
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        <Toaster theme="light" richColors closeButton />
      </body>
    </html>
  )
}
