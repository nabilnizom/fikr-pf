import { getQuestions } from '@components/helpers/questions'
import QuestionRow from './questionRow'

const QuestionTable = async () => {
  const questions = await getQuestions()

  return (
    <table className='table-fixed w-full bg-white rounded-xl overflow-hidden'>
      <tbody>
        <tr className='bg-gray-300'>
          <th className='border py-2 w-1/12'>No.</th>
          <th className='border py-2 '>Question</th>
          <th className='border py-2 w-1/12'>Trait</th>
          <th className='border py-2 w-1/12'>Actions</th>
        </tr>
        {questions?.map((q: any, index: number) => (
          <QuestionRow key={q._id} q={q} index={index} />
        ))}
      </tbody>
    </table>
  )
}

export default QuestionTable
