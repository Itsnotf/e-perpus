import {
  deleteDataPeminjaman,
  getDataPeminjaman,
  getDataPeminjamanById,
} from '@/service/data/peminjaman'
import { addPengembalian } from '@/service/data/pengembalian'
import { db } from '@/service/firebase-sdk'
import { ApiResponse, PeminjamanBody } from '@/types/request'
import { addDoc, collection } from 'firebase/firestore'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const json = await getDataPeminjaman()

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

export async function DELETE(request: Request) {
  try {
    const { idPeminjaman } = await request.json()
    if (!idPeminjaman) {
      return new NextResponse(
        JSON.stringify({ status: 'fail', message: 'Loan ID is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    const response = await deleteDataPeminjaman(idPeminjaman)

    let json_response = {
      status: 'success',
      message: response,
    }
    return new NextResponse(JSON.stringify(json_response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error:any) {
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
