import Link from 'next/link'

const AdminPage = () => {
  return (
    <div className='flex flex-col justify-center gap-10 items-center min-w-screen min-h-screen bg-white'>
      <Link
        className='w-1/3 text-center p-5 text-xl hover:bg-slate-100 border border-black-200 rounded'
        href='/admin/questions'
      >
        Add questions
      </Link>
      <Link
        className='w-1/3 text-center p-5 text-xl hover:bg-slate-100 border border-black-200 rounded'
        href='/admin/keygen'
      >
        Generate keys
      </Link>
    </div>
  )
}

export default AdminPage
