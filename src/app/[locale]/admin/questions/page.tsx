import { useTranslations } from 'next-intl'
import { traits } from '@components/helpers/traits.json'
import { createQuestions } from './actions/createQuestions'
import Form from './_components/form'

export default function AdminQuestionsPage() {
  const t = useTranslations('Traits')

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
      <table className='table-fixed w-full bg-white rounded-xl overflow-hidden'>
        <tbody>
          <tr className='bg-gray-300'>
            <th className='border py-2 w-1/12'>No.</th>
            <th className='border py-2 '>Question</th>
            <th className='border py-2 w-1/12'>Trait</th>
          </tr>
          {/* for loop for questions */}
          <tr className='odd:bg-gray-100'>
            <td className='border text-center'>1</td>
            <td className='border p-2'>Test</td>
            <td className='border text-center'>AH</td>
          </tr>
          <tr className='odd:bg-gray-100'>
            <td className='border py-2 text-center'>2</td>
            <td className='border p-2'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque,
              quod mollitia facilis a, rem voluptatem nihil dolorem nesciunt
              adipisci aperiam, molestiae repellendus dignissimos. Sit
              recusandae qui saepe, eveniet consequatur perferendis!
            </td>
            <td className='border py-2 text-center'>CO</td>
          </tr>
        </tbody>
      </table>
    </main>
  )
}
