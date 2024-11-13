import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Inter, IBM_Plex_Mono } from 'next/font/google'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'
import '@/styles/globals.css'

const droneRangerProBold = localFont({
  src: './fonts/dronerangerpro_bold.otf',
  variable: '--drone-bold',
  weight: '100 900',
})

const ibmMono = IBM_Plex_Mono({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--ibm-mono',
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
        className={`${droneRangerProBold.variable} ${inter.className} ${ibmMono.variable} antialiased`}
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
