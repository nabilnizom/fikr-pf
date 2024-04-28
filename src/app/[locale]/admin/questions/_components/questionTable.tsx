import { getQuestions } from '@components/helpers/questions'

const QuestionTable = async () => {
  const questions = await getQuestions()

  return (
    <table className='table-fixed w-full bg-white rounded-xl overflow-hidden'>
      <tbody>
        <tr className='bg-gray-300'>
          <th className='border py-2 w-1/12'>No.</th>
          <th className='border py-2 '>Question</th>
          <th className='border py-2 w-1/12'>Trait</th>
        </tr>
        {questions?.map((q: any, index: number) => (
          <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
            <td className='border py-2 text-center'>{index + 1}</td>
            <td className='border py-2'>{q.question}</td>
            <td className='border py-2 text-center'>{q.trait}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default QuestionTable
