'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import styles from './styles.module.css'

export default function DashboardPage() {
    const router = useRouter()

    const jumpTo = () => router.push('/list/3')

    return (
    <div>
      <h2 className={styles['p-5']}>Dashboard Page</h2>
      
      <ul>
        <li>
          <Link href="/list/1" className="underline">item 1</Link>
        </li>
        <li>
          <Link href="/list/2" className="underline">item 2</Link>
        </li>
      </ul>

      {/* <button onClick={jumtTo} className="underline">item 3</button> */}
      <button onClick={jumpTo} className="btn btn-primary">item 3</button>
    </div>
    )
}