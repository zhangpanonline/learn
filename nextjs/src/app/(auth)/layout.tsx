import './globals.css'
// import { Inter } from 'next/font/google'
import type { Metadata } from "next";

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'auth',
    description: 'auth relation',
}

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang='zh_cn'>
            <body>{children}</body>
        </html>
    )
}