import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '@/styles/globals.css'

const droneRangerProBold = localFont({
  src: './fonts/dronerangerpro_bold.otf',
  variable: '--drone-bold',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Card NFT',
  description: 'New Arrival Card NFT',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body className={`${droneRangerProBold.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
