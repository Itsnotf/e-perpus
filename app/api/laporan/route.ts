import { db } from '@/service/firebase-sdk'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const tipePelajar = request.nextUrl.searchParams.get('tipePelajar')

    const json =
      tipePelajar === 'SMA' ? await getLaporanSMA() : await getLaporanSMP()
    // const json = await getLaporanSMA()
    // const json = await getLaporanSMP()
    // console.log({ json })

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

type MonthlyDataSMP = {
  [month: string]: {
    VII: number
    VIII: number
    IX: number
  }
}

const getLaporanSMP = async () => {
  const monthlyDataSMP: MonthlyDataSMP = {}

  // Query peminjaman collection
  const peminjamanQuery = query(
    collection(db, 'peminjaman'),
    orderBy('tanggalPeminjaman', 'asc'),
  )

  const peminjamanDocs = await getDocs(peminjamanQuery)

  // Fungsi untuk mendapatkan informasi anggota berdasarkan nis
  const getAnggotaInfo = async (nis: string) => {
    const anggotaQuery = query(
      collection(db, 'anggota'),
      where('nis', '==', nis),
    )
    const anggotaDocs = await getDocs(anggotaQuery)

    if (anggotaDocs.size > 0) {
      return anggotaDocs.docs[0].data()
    }

    return null
  }

  for (const doc of peminjamanDocs.docs) {
    const data = doc.data()

    // Get member information
    const anggotaInfo = await getAnggotaInfo(data.nis)

    if (anggotaInfo) {
      const kelas = anggotaInfo.kelas

      // Check if it's an SMP class (VII, VIII, IX)
      if (['VII', 'VIII', 'IX'].includes(kelas)) {
        const month = new Date(data.tanggalPeminjaman).toLocaleString('en-US', {
          month: 'long',
        })

        // Initialize default values if not present
        if (!monthlyDataSMP[month]) {
          monthlyDataSMP[month] = {
            VII: 0,
            VIII: 0,
            IX: 0,
          }
        }

        // Initialize default values for the class if not present
        const kelasKey: 'VII' | 'VIII' | 'IX' = kelas as 'VII' | 'VIII' | 'IX'

        if (!monthlyDataSMP[month][kelasKey]) {
          monthlyDataSMP[month][kelasKey] = 0
        }

        // Increment the initialized value based on the class
        monthlyDataSMP[month][kelasKey]++
      }
    }
  }

  return monthlyDataSMP
}

type MonthlyDataSMA = {
  [month: string]: {
    jumlahSiswaIPA: {
      X: number
      XI: number
      XII: number
    }
    jumlahSiswaIPS: {
      X: number
      XI: number
      XII: number
    }
  }
}

const getLaporanSMA = async () => {
  const monthlyDataSMA: MonthlyDataSMA = {}

  // Query peminjaman collection
  const peminjamanQuery = query(
    collection(db, 'peminjaman'),
    orderBy('tanggalPeminjaman', 'asc'),
  )

  const peminjamanDocs = await getDocs(peminjamanQuery)

  // Fungsi untuk mendapatkan informasi anggota berdasarkan nis
  const getAnggotaInfo = async (nis: string) => {
    const anggotaQuery = query(
      collection(db, 'anggota'),
      where('nis', '==', nis),
      where('tipePelajar', '==', 'SMA'),
    )
    const anggotaDocs = await getDocs(anggotaQuery)

    if (anggotaDocs.size > 0) {
      return anggotaDocs.docs[0].data()
    }

    return null
  }

  // Loop melalui dokumen peminjaman
  for (const doc of peminjamanDocs.docs) {
    const data = doc.data()

    const month = new Date(data.tanggalPeminjaman).toLocaleString('en-US', {
      month: 'long',
    })

    // Inisialisasi nilai default jika belum ada
    if (!monthlyDataSMA[month]) {
      monthlyDataSMA[month] = {
        jumlahSiswaIPA: {
          X: 0,
          XI: 0,
          XII: 0,
        },
        jumlahSiswaIPS: {
          X: 0,
          XI: 0,
          XII: 0,
        },
      }
    }

    // Dapatkan informasi anggota
    const anggotaInfo = await getAnggotaInfo(data.nis)

    if (anggotaInfo) {
      const kategoriKelas = anggotaInfo.kategoriKelas
      const kelas = anggotaInfo.kelas

      // Inisialisasi nilai default untuk kelas jika belum ada
      const kelasKey: 'X' | 'XI' | 'XII' = kelas as 'X' | 'XI' | 'XII'

      if (!monthlyDataSMA[month].jumlahSiswaIPA[kelasKey]) {
        monthlyDataSMA[month].jumlahSiswaIPA[kelasKey] = 0
      }

      if (!monthlyDataSMA[month].jumlahSiswaIPS[kelasKey]) {
        monthlyDataSMA[month].jumlahSiswaIPS[kelasKey] = 0
      }

      if (kategoriKelas === 'IPA') {
        // Tambahkan 1 ke nilai yang sudah diinisialisasi
        monthlyDataSMA[month].jumlahSiswaIPA[kelasKey]++
      } else {
        // Tambahkan 1 ke nilai yang sudah diinisialisasi
        monthlyDataSMA[month].jumlahSiswaIPS[kelasKey]++
      }
    }
  }

  return monthlyDataSMA
}
