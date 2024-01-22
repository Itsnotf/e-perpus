import { ubahBuku } from '@/service/data/buku'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { idBuku, data } = await request.json()
    // console.log({ idBuku, data })

    const response = await ubahBuku(idBuku, data)

    let json_response = {
      status: 'success',
      data: response,
    }
    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
