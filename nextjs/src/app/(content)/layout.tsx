'use client'

import './globals.css'
import NavBar from './components/navbar/index'
import Footer from './components/footer'
import { ThemeContext } from './theme-context'
import { useState } from 'react'
import SideMenu from './components/sidemenu'

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode
}>) {
    const [ theme, setTheme ] = useState('light')
    return (
        <html lang="zh_cn" >
            <body data-theme={theme} >
                <ThemeContext value={{ theme, setTheme }}>
                    <div className="drawer drawer-mobile lg:drawer-open">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            <NavBar></NavBar>
                            {children}
                            <Footer></Footer>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer" className="drawer-overlay"></label>
                            <div className="rounded-box bg-base-200 h-full">
                                <p className="btn w-full btn-square btn-ghost text-2xl mb-4">
                                    XXX
                                </p>
                                <SideMenu></SideMenu>
                            </div>
                        </div>
                    </div>
                </ThemeContext>
            </body>
        </html>
    )
}