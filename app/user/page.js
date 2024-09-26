'use client'
import useSWR from 'swr'

 
const fetcher = (...args) => fetch(...args).then((res) => res.json())
 
export default function Profile() {
  const { data, error } = useSWR('/api/user', fetcher)
 
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
    const user = data.data

  return (
    <div>
        emaill
      <h1>{user.phonenumber}</h1>
    </div>
  )
}