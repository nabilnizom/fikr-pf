import { useTranslations } from 'next-intl'
import { createQuestions } from './actions/createQuestions'
import Form from './_components/form'
import QuestionTable from './_components/questionTable'
import { Traits } from '@components/helpers/enums'

export default function AdminQuestionsPage() {
  const t = useTranslations('Traits')
  const traits = Object.keys(Traits)

  return (
    <main className='w-full container mx-auto px-2 py-10 flex flex-col gap-5'>
      <div id='admin-questions__top-bar'>
        <Form action={createQuestions}>
          <select name='trait' id='trait' required className='rounded-lg p-2'>
            {traits.map((trait: string) => (
              <option key={trait} value={trait}>
                {t(trait)}
              </option>
            ))}
          </select>
          <input
            type='text'
            name='question'
            id='question'
            className='flex-1 text-center rounded-lg'
            placeholder='Insert Question Here'
            required
          />
          <button type='submit' className='rounded-lg bg-white w-10 h-10'>
            +
          </button>
        </Form>
      </div>
      <div id='admin-questions__table'>
        <QuestionTable />
      </div>
    </main>
  )
}
