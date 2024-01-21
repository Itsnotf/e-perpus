import { db } from '../firebase-sdk'
import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore'
import { getDataAnggota, hapusAnggota } from './anggota'
import { getDataBuku, hapusBuku } from './buku'
import {
  deletePengembalianById,
  deletePengembalianByPeminjamanId,
  getDataPengembalian,
  getDataPengembalianById,
  getDataPengembalianByIdPeminjaman,
} from './pengembalian'
import { TResponseGetPeminjaman } from '@/types/peminjaman'
import { TAnggota } from '@/types/anggota'
import { TBuku } from '@/types/buku'

export async function getDataPeminjaman() {
  try {
    const peminjamanCollection = await getDocs(collection(db, 'peminjaman'))

    const responsePromises = peminjamanCollection.docs.map(async (document) => {
      const data = {
        idPeminjaman: document.id,
        idAnggota: document.data().idAnggota,
        dataAnggota: await getDataAnggota(document.data().idAnggota),
        idBuku: document.data().idBuku,
        dataBuku: await getDataBuku(document.data().idBuku),

        tanggalPeminjaman: new Date(document.data().tanggalPeminjaman),
        tanggalPengembalian: new Date(document.data().tanggalPengembalian),
      }

      return data
    })

    const response = await Promise.all(responsePromises)
    console.log({ response })

    return response
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export async function getDataPeminjamanById(idPeminjaman: string) {
  try {
    const peminjamanDocRef = doc(db, 'peminjaman', idPeminjaman)
    const document = await getDoc(peminjamanDocRef)

    if (document.exists()) {
      const data: TResponseGetPeminjaman = {
        idPeminjaman: peminjamanDocRef.id,
        idAnggota: document.data().idAnggota,
        dataAnggota: (await getDataAnggota(
          document.data().idAnggota,
        )) as TAnggota,
        idBuku: document.data().idBuku,
        dataBuku: (await getDataBuku(document.data().idBuku)) as TBuku,

        tanggalPeminjaman: new Date(document.data().tanggalPeminjaman),
        tanggalPengembalian: new Date(document.data().tanggalPengembalian),
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

export async function deleteDataPeminjaman(idPeminjaman: string) {
  try {
    const dataPeminjaman = await getDataPeminjaman()

    dataPeminjaman.map(async (doc) => {
      if (doc.idPeminjaman === idPeminjaman) {
        await hapusBuku(doc.idBuku)
        await hapusAnggota(doc.idAnggota)
        await deletePengembalianByPeminjamanId(idPeminjaman)
      }
    })

    const peminjamanDocRef = doc(db, 'peminjaman', idPeminjaman)
    await deleteDoc(peminjamanDocRef)

    console.log('Peminjaman deleted successfully.')
    console.log({ peminjamanDocRef, idPeminjaman })
  } catch (error) {
    console.error('Error deleting peminjaman:', error)
    throw error
  }
}
