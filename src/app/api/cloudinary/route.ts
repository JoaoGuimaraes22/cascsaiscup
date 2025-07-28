// src/app/api/cloudinary/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const folder = 'cascais2025'

  const result = await fetch(
    `https://api.cloudinary.com/v1_1/dek4semrg/resources/image?prefix=${folder}/&max_results=100`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`
        ).toString('base64')}`
      },
      cache: 'no-store'
    }
  )

  const data = await result.json()

  if (!data.resources) {
    return NextResponse.json({ resources: [] }, { status: 200 })
  }

  return NextResponse.json(
    data.resources.map((item: any) => ({
      public_id: item.public_id,
      url: item.secure_url
    }))
  )
}
