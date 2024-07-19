import appConfig from '@components/config'
import { fetchReportInputValidation } from '@components/helpers/report'
import { NextRequest, NextResponse } from 'next/server'

const puppeteer = require('puppeteer')

export async function POST(req: Request, res: Response) {
  const bodyData = await req.json()
  const pdf = await printPDF(bodyData)

  return new Response(pdf)
}

export async function GET(req: NextRequest, res: NextResponse) {
  return new Response('OK')
}

async function printPDF(input: any) {
  const res = await fetch(appConfig.pdfGen.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })

  const pdf = await res.arrayBuffer()

  return pdf
}
