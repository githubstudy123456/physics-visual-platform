import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: '物理可视化平台',
  description: '初高中物理知识点、交互仿真与题目视频工作台',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
  const umamiScriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL

  return (
    <html lang="zh-CN">
      <body>
        {children}
        {umamiWebsiteId && umamiScriptUrl ? (
          <Script defer src={umamiScriptUrl} data-website-id={umamiWebsiteId} strategy="afterInteractive" />
        ) : null}
      </body>
    </html>
  )
}
