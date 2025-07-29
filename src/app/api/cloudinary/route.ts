// pages/api/test-cloudinary.js (for Pages Router)
// OR
// app/api/test-cloudinary/route.js (for App Router)

// app/api/test-cloudinary/route.ts
import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from 'next/server'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function GET() {
  try {
    const result = await cloudinary.search
      .expression('folder:cascaiscup')
      .max_results(100)
      .execute()

    return NextResponse.json({
      success: true,
      imageCount: result.total_count,
      images: result.resources.map((img: any) => ({
        public_id: img.public_id,
        url: img.secure_url,
        created_at: img.created_at
      }))
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    )
  }
}
