import { fetchReportInputValidation } from '@components/helpers/report'
import type { NextApiRequest, NextApiResponse } from 'next'
const puppeteer = require('puppeteer')

export async function POST(req: Request, res: Response) {

  const bodyData = await req.json()
  const pdf = await printPDF(bodyData)

  return new Response(pdf)
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ name: 'John Doe' })
  return new Response('OK')
}

async function printPDF(input: any) {
  const bodyData = await fetchReportInputValidation(input)

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  await page.setRequestInterception(true)

  page.once('request', (request: any) => {
    var data = {
      method: 'POST',
      postData: JSON.stringify(bodyData),
      headers: {
        ...request.headers(),
      },
    }

    request.continue(data)

    page.setRequestInterception(false)
  })

  await page.goto('https://pdf.philipyong.com/src/index.php', {
    waitUntil: 'networkidle0',
  })
  const pdf = await page.pdf({ format: 'A4' })

  await browser.close()
  return pdf
}