import { getDataBukuAll } from '@/service/data/buku'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // const tipePelajar = request.nextUrl.searchParams.get('tipePelajar')

    const json = await getDataBukuAll()

    // const jsonFiltered = json.filter(
    //   (item: any) => item?.tipePelajar === tipePelajar,
    // )
    let json_response = {
      status: 'success',
      data: json,
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
