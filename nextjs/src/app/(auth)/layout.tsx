import './globals.css'
// import { Inter } from 'next/font/google'
import type { Metadata } from "next";

// const inter = Inter({ subsets: ['latin'] })

import { Provider } from 'react-redux';
import { store } from '@/store';

export const metadata: Metadata = {
    title: 'auth',
    description: 'auth relation',
}

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang='zh_cn'>
            <body>
                <Provider store={store}>
                    {children}
                </Provider>
            </body>
        </html>
    )
}