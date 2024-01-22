import {
  getDocs,
  collection,
  query,
  where,
  CollectionReference,
  DocumentData,
} from 'firebase/firestore'
import { db } from '../firebase-sdk'
import { TTipePelajar } from '@/hooks/useCredential'

// Fungsi utilitas untuk menghitung jumlah dokumen dalam suatu koleksi
export const countDocuments = async (
  collectionRef: CollectionReference<DocumentData, DocumentData>,
  condition = null as any, // Kondisi untuk query opsional, default null
  statusMessage: string, // Pesan log untuk menunjukkan status
  tipePelajar: TTipePelajar,
) => {
  try {
    // Membuat referensi query dengan atau tanpa kondisi
    const queryRef = condition ? query(collectionRef, condition) : collectionRef
    // Mendapatkan snapshot dokumen dari koleksi atau query
    const snapshot = await getDocs(queryRef)

    const data = snapshot.docs.map((doc) => doc.data())
    const filteredData = data.filter((item) => item.tipePelajar === tipePelajar)

    // Menghitung jumlah dokumen dalam snapshot
    const count = filteredData.length
    console.log(`Jumlah ${statusMessage}:`, count)
    return count
  } catch (error) {
    // Menangani error jika terjadi saat menghitung jumlah dokumen
    console.error(`Error saat menghitung jumlah ${statusMessage}:`, error)
  }
}

// Fungsi untuk menghitung jumlah dokumen dalam koleksi 'anggota'
export const countAnggota = async (tipePelajar: TTipePelajar) => {
  const anggotaCollectionRef = collection(db, 'anggota')
  return countDocuments(
    anggotaCollectionRef,
    null, // Tidak ada kondisi khusus untuk koleksi 'anggota'
    'dokumen di collection anggota',
    tipePelajar,
  )
}

// Fungsi untuk menghitung jumlah buku dengan status 'selesai'
export const countBukuDikembalikan = async (tipePelajar: TTipePelajar) => {
  const bukuCollectionRef = collection(db, 'pengembalian')
  const statusCondition = where('status', '==', 'selesai') // Kondisi untuk buku selesai
  return countDocuments(
    bukuCollectionRef,
    statusCondition,
    'buku dengan status "selesai"',
    tipePelajar,
  )
}

// Fungsi untuk menghitung jumlah buku dengan status 'belum'
export const countBukuBelumDikembalikan = async (tipePelajar: TTipePelajar) => {
  const bukuCollectionRef = collection(db, 'pengembalian')
  const statusCondition = where('status', '==', 'belum') // Kondisi untuk buku belum dikembalikan
  return countDocuments(
    bukuCollectionRef,
    statusCondition,
    'buku dengan status "belum"',
    tipePelajar,
  )
}
