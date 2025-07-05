import axios from 'axios'
import { useEffect, useState } from 'react'

export default function() {
    const [msg, setMsg] = useState('...')
    useEffect(() => {
        fetchData()
        async function fetchData() {
            // const res = await axios({
            //     method: 'get',
            //     url: '/api/'
            // })
            const res = await axios({
                method: 'post',
                url: '/api/user/create-user/',
                data: {
                    name: 'test',
                    age: 18
                }
            })
            console.log(res)
            setMsg(JSON.stringify(res.data ?? res))
        }
    }, [])
    return `${msg}`
}