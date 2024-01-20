import { hapusBuku } from '@/service/data/buku'
import { NextResponse } from 'next/server'

export async function DELETE(request: Request) {
  try {
    const { idBuku } = await request.json()

    const response = await hapusBuku(idBuku)
    console.log({ idBuku })

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
