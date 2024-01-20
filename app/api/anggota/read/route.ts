import { getDataAnggota, tambahAnggota } from '@/service/data/anggota'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { idAnggota } = await request.json()

    const response = await getDataAnggota(idAnggota)

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
