import { getDataPengembalian } from '@/service/data/pengembalian'
import {
  countAnggota,
  countBukuBelumDikembalikan,
  countBukuDikembalikan,
} from '@/service/data/statistic'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const json = {
      anggota: await countAnggota(),
      bukuDikembalikan: await countBukuDikembalikan(),
      bukuBelumDikembalikan: await countBukuBelumDikembalikan(),
      denda: 0,
    }

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
