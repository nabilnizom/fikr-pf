import Image from 'next/image'
import QuizPage from './page'
import React, { Suspense } from 'react'

const QuizLayout: React.FC = () => {
  return (
    <div
      style={{ backgroundImage: 'url(/quizBg.jpg)' }}
      className='min-w-screen min-h-screen w-full h-full bg-cover top-0 left-0 z-0 fixed overflow-scroll'
    >
      <QuizPage />
      {/* <Image
        src={'/quizBg.jpg'}
        alt={'Quiz Background'}
        width={1920}
        height={1080}
        layout='responsive'
        className='fixed top-0 left-0 z-0 w-full h-full object-cover'
      /> */}
    </div>
  )
}

export default QuizLayout
