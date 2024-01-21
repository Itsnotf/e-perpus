import { db } from '@/service/firebase-sdk'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const json = await getLaporan()

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

type MonthlyData = {
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

const getLaporan = async () => {
  const monthlyData: MonthlyData = {}

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

  // Loop melalui dokumen peminjaman
  for (const doc of peminjamanDocs.docs) {
    const data = doc.data()

    const month = new Date(data.tanggalPeminjaman).toLocaleString('en-US', {
      month: 'long',
    })

    // Inisialisasi nilai default jika belum ada
    if (!monthlyData[month]) {
      monthlyData[month] = {
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

      if (!monthlyData[month].jumlahSiswaIPA[kelasKey]) {
        monthlyData[month].jumlahSiswaIPA[kelasKey] = 0
      }

      if (!monthlyData[month].jumlahSiswaIPS[kelasKey]) {
        monthlyData[month].jumlahSiswaIPS[kelasKey] = 0
      }

      if (kategoriKelas === 'IPA') {
        // Tambahkan 1 ke nilai yang sudah diinisialisasi
        monthlyData[month].jumlahSiswaIPA[kelasKey]++
      } else {
        // Tambahkan 1 ke nilai yang sudah diinisialisasi
        monthlyData[month].jumlahSiswaIPS[kelasKey]++
      }
    }
  }

  return monthlyData
}

// async function generateLaporanPengunjungByKelas(): Promise<
//   TLaporanPengunjungByKelas
// > {
//   const kelasList = ['X', 'XI', 'XII']
//   const kategoriKelasList = ['IPA', 'IPS']

//   const laporan: TLaporanPengunjungByKelas = {
//     jumlahSiswaIPA: { X: 0, XI: 0, XII: 0 },
//     jumlahSiswaIPS: { X: 0, XI: 0, XII: 0 },
//   }

//   const promises: Promise<number>[] = []

//   // Loop through each class and each category
//   for (const kelas of kelasList) {
//     for (const kategoriKelas of kategoriKelasList) {
//       promises.push(
//         countAnggotaByKategoriKelas(kelas, kategoriKelas as 'IPA' | 'IPS'),
//       )
//     }
//   }

//   // Wait for all promises to resolve
//   const counts = await Promise.all(promises)

//   // Loop through each class and each category again
//   let index = 0
//   for (const kelas of kelasList) {
//     for (const kategoriKelas of kategoriKelasList) {
//       const count = counts[index++]

//       if (kategoriKelas === 'IPA') {
//         laporan.jumlahSiswaIPA[kelas as 'X' | 'XI' | 'XII'] = count
//       } else {
//         laporan.jumlahSiswaIPS[kelas as 'X' | 'XI' | 'XII'] = count
//       }
//     }
//   }

//   return laporan
// }
