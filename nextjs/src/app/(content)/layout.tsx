'use client'

// import type { Metadata } from 'next'
import { useState } from 'react'
import './globals.css'

// export const metadata: Metadata = {
//     title: '内容页',
//     description: 'description'
// }

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode
}>) {

    const [ articleId, setArticleId ] = useState(0)
    const articlelist = [
        { id: 0, title: 'vue' },
        { id: 1, title: 'react' },
        { id: 2, title: 'angle' },
    ]

    return (
        <html lang="zh_cn" >
            <body>
                <div className="drawer drawer-mobile">
                    <input id="my-drawer" type="checkbox" defaultChecked className="drawer-toggle" />
                    <div className="drawer-content pl-80">
                        {children}
                    </div>
                    <div className="drawer-side bg-base-200 w-80 h-full">
                        <ul className="menu rounded-box w-80">
                            <li className="btn btn-ghost text-2xl w-[154px] mb-4">
                                大前端
                            </li>
                            {
                                articlelist.map(v => (
                                    <li key={v.id} onClick={() => setArticleId(v.id)}>
                                        <p className={v.id === articleId ? 'menu-active' : ''}>{v.title}</p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </body>
        </html>
    )
}