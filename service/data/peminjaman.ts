import { FirebaseApp } from 'firebase/app'
import { db } from '../firebase-sdk'
import {
  DocumentData,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { PeminjamanBody } from '@/types/request'
import { getDataAnggota } from './anggota'
import { getDataBuku } from './buku'

export async function getDataPeminjaman() {
  try {
    const peminjamanCollection = await getDocs(collection(db, 'peminjaman'))

    const responsePromises = peminjamanCollection.docs.map(async (document) => {
      const data = {
        idPeminjaman: document.id,
        idAnggota: document.data().idAnggota,
        dataAnggota: await getDataAnggota(document.data().idAnggota),
        kodeBuku: document.data().kodeBuku,
        databuku: await getDataBuku(document.data().kodeBuku),

        tanggalPeminjaman: new Date(document.data().tanggalPeminjaman),
        tanggalPengembalian: new Date(document.data().tanggalPengembalian),
      }

      return data
    })

    const response = await Promise.all(responsePromises)

    return response
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export async function getDataPeminjamanById(idPeminjaman: string) {
  try {
    const peminjamanDocRef = doc(db, 'peminjaman', idPeminjaman)
    const peminjamanSnapshot = await getDoc(peminjamanDocRef)

    if (peminjamanSnapshot.exists()) {
      const data = {
        idAnggota: peminjamanSnapshot.data().idAnggota,
        dataAnggota: await getDataAnggota(peminjamanSnapshot.data().idAnggota),
        kodeBuku: peminjamanSnapshot.data().kodeBuku,
        databuku: await getDataBuku(peminjamanSnapshot.data().kodeBuku),

        tanggalPeminjaman: new Date(
          peminjamanSnapshot.data().tanggalPeminjaman,
        ),
        tanggalPengembalian: new Date(
          peminjamanSnapshot.data().tanggalPengembalian,
        ),
      }

      return data
    } else {
      return null
    }
  } catch (error) {
    console.error('Error fetching peminjaman data:', error)
    throw error
  }
}
