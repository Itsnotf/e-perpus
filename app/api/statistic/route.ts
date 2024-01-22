import { TTipePelajar } from '@/hooks/useCredential'
import { getDataPengembalian } from '@/service/data/pengembalian'
import {
  countAnggota,
  countBukuBelumDikembalikan,
  countBukuDikembalikan,
} from '@/service/data/statistic'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const tipePelajar = request.nextUrl.searchParams.get('tipePelajar')

    const json = {
      anggota: await countAnggota(tipePelajar as TTipePelajar),
      bukuDikembalikan: await countBukuDikembalikan(
        tipePelajar as TTipePelajar,
      ),
      bukuBelumDikembalikan: await countBukuBelumDikembalikan(
        tipePelajar as TTipePelajar,
      ),
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
