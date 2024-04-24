'use client'

import UserDetails from '@components/app/[locale]/registration/UserDetails'

export default function Home() {
  return (
    <div className='min-w-screen min-h-screen h-full w-full'>
      <div className='w-screen h-screen flex justify-center items-center bg-slate-200'>
        <UserDetails />
      </div>
    </div>
  )
}
