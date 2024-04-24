import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { locales } from './config/next-intl'

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  const messages = {
    ...(await import(`../messages/${locale}/traits.json`)).default,
  }

  return {
    messages: messages,
  }
})
