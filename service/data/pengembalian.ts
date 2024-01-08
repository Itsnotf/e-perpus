import { db } from '../firebase-sdk'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { getDataPeminjamanById } from './peminjaman'
import { PeminjamanBody } from '@/types/request'

export async function getDataPengembalian() {
  try {
    const peminjamanCollection = await getDocs(collection(db, 'pengembalian'))

    const responsePromises = peminjamanCollection.docs.map(async (document) => {
      const data = {
        idPeminjaman: document.data().idPeminjaman,
        dataPeminjaman: await getDataPeminjamanById(
          document.data().idPeminjaman,
        ),
        status: document.data().status,
        denda: document.data().denda,
        tanggalPengembalian: new Date(document.data().tanggalPengembalian),
      }

      return data
    })

    const response = await Promise.all(responsePromises)

    // Sort the response based on the "status" field
    const sortedResponse = response.sort((a, b) => {
      if (a.status !== 'selesai' && b.status === 'selesai') {
        return -1
      } else if (a.status === 'selesai' && b.status !== 'selesai') {
        return 1
      } else {
        return 0
      }
    })

    return sortedResponse
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export async function postUpdateStatus(idPeminjaman: string) {
  try {
    const q = query(
      collection(db, 'pengembalian'),
      where('idPeminjaman', '==', idPeminjaman),
    )
    const querySnapshot = await getDocs(q)

    // Check if the document with the specified idPeminjaman exists
    if (querySnapshot.size === 0) {
      console.error(`Document with idPeminjaman ${idPeminjaman} not found`)
      return
    }

    const newStatusValue = 'selesai'

    const pengembalianDocRef = doc(db, 'pengembalian', querySnapshot.docs[0].id)
    await updateDoc(pengembalianDocRef, {
      status: newStatusValue,
      tanggalPengembalian: new Date(),
    })

    console.log(`Status updated successfully for idPeminjaman: ${idPeminjaman}`)
  } catch (error) {
    console.error('Error updating status:', error)
    throw error
  }
}

export async function addPengembalian(json: PeminjamanBody) {
  const anggotaRef = collection(db, 'anggota')
  const anggotaDoc = await addDoc(anggotaRef, json.anggota)

  const bukuRef = collection(db, 'buku')
  const bukuDoc = await addDoc(bukuRef, json.buku)

  // add the id from document
  json.peminjaman.idAnggota = anggotaDoc.id
  json.peminjaman.kodeBuku = bukuDoc.id

  const peminjamanRef = collection(db, 'peminjaman')
  const peminjamanDoc = await addDoc(peminjamanRef, json.peminjaman)

  json.pengembalian.idPeminjaman = peminjamanDoc.id
  const pengembalianRef = collection(db, 'pengembalian')
  await addDoc(pengembalianRef, json.pengembalian)
}
