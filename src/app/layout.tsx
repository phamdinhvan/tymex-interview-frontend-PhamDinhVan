import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'

const droneRangerProBold = localFont({
  src: './fonts/dronerangerpro_bold.otf',
  variable: '--drone-bold',
  weight: '100 900',
})

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Card NFT',
  description: 'New Arrival Card NFT',
  icons: {
    icon: '/images/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body
        className={`${droneRangerProBold.variable} ${inter.className} antialiased`}
      >
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#DA458F',
              },
            }}
          >
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}
