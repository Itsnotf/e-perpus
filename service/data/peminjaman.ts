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

export async function deleteDataPeminjaman(idPeminjaman: string) {
  try {
    const dataPeminjaman = await getDataPeminjaman()

    dataPeminjaman.map(async (doc) => {
      if (doc.idPeminjaman === idPeminjaman) {
        await hapusBuku(doc.kodeBuku)
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
