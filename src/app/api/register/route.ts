import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, mobile, club, city, country, questions } = body

    const emailHtml = `
      <h2>New Registration</h2>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Mobile:</strong> ${mobile || 'N/A'}</li>
        <li><strong>Club:</strong> ${club}</li>
        <li><strong>City:</strong> ${city}</li>
        <li><strong>Country:</strong> ${country}</li>
        <li><strong>Questions:</strong> ${questions || 'N/A'}</li>
      </ul>
    `

    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO!,
      subject: 'New Cascais Registration',
      html: emailHtml
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('❌ Email Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
