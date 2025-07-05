'use client'

// import { createClient } from "./server"
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

import { useEffect, useState } from 'react'

const TABLE_NAME = 'crud'

export default function() {
  // const supabase = await createClient();
  const [ data, setData ] = useState([])
  const [res, setRes] = useState({})
  useEffect(() => {
    supabase.from(TABLE_NAME).select().then(({ data: crud }) => {
      setData(crud as [])
    })
  }, [])

  async function handleCreate() {
    const res = await supabase.from(TABLE_NAME).insert({ text: '插入一条数据' })
    setRes(res)
  }

  return (
    <>
    <div className='w-screen overflow-hidden m-5' >
      <button className='btn btn-primary' onClick={handleCreate} >创建数据</button>
      <p>返回结果：</p>
      <div className="mockup-code">
        <code>{JSON.stringify(res)}</code>
      </div>
      <div className="divider divider-success"></div>
      请求到的数据：
      <div className="mockup-code">
        { data.map(v => <code className="block mb-4" >{JSON.stringify(v)}</code>) }
      </div>
    </div>
    </>
  )
}