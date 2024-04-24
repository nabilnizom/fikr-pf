'use client'

import { useRef } from 'react'

export default function Form({
  action,
  children,
}: {
  action: Function
  children: React.ReactNode
}) {
  const ref = useRef<HTMLFormElement>(null)

  return (
    <form
      ref={ref}
      action={async (formData) => {
        await action(formData)
        ref.current?.reset()
      }}
      className='flex gap-3'
    >
      {children}
    </form>
  )
}
