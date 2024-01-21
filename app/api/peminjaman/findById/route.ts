import { getDataPeminjamanById } from '@/service/data/peminjaman'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Extract the idPeminjaman parameter from the query parameters
    const idPeminjaman = request.nextUrl.searchParams.get('idPeminjaman')
    console.log({ idPeminjaman })

    // Check if the idPeminjaman parameter is present
    if (!idPeminjaman) {
      throw new Error('idPeminjaman parameter is missing')
    }

    const json = await getDataPeminjamanById(idPeminjaman)

    let json_response = {
      status: 'success',
      data: json,
    }

    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }
}
