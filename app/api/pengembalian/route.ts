import { addPengembalian } from '@/service/data/pengembalian'
import { getDataPengembalian } from '@/service/data/pengembalian'
import { PeminjamanBody } from '@/types/request'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const json = await getDataPengembalian()

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

export async function POST(request: Request) {
  try {
    const json: PeminjamanBody = await request.json()

    await addPengembalian(json)

    let json_response = {
      status: 'success',
      data: json,
    }
    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error:any) {
    if (error.code === 'P2002') {
      let error_response = {
        status: 'fail',
        message: 'Feedback with title already exists',
      }
      return new NextResponse(JSON.stringify(error_response), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    let error_response = {
      status: 'error',
      message: error.message,
    }
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
