import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../firebase-sdk'

// const dataAnggota = {
//   nama: 'John Doe',
//   // sesuaikan sesuai kebutuhan
// };

export async function getDataAnggota(idAnggota: string) {
  try {
    const anggotaDocRef = doc(db, 'anggota', idAnggota)
    const anggotaSnapshot = await getDoc(anggotaDocRef)

    if (anggotaSnapshot.exists()) {
      return anggotaSnapshot.data()
    } else {
      return null
    }
  } catch (error) {
    console.error('Error fetching anggota data:', error)
    throw error
  }
}

export async function tambahAnggota(dataAnggota: any) {
  try {
    const anggotaCollectionRef = collection(db, 'anggota')
    const newAnggotaRef = await addDoc(anggotaCollectionRef, dataAnggota)

    return newAnggotaRef.id
  } catch (error) {
    console.error('Error menambahkan anggota:', error)
    throw error
  }
}

export async function ubahAnggota(idAnggota: string, dataAnggota: any) {
  try {
    const anggotaDocRef = doc(db, 'anggota', idAnggota)
    await updateDoc(anggotaDocRef, dataAnggota)

    console.log('Anggota berhasil diubah')
  } catch (error) {
    console.error('Error mengubah anggota:', error)
    throw error
  }
}

export async function hapusAnggota(idAnggota: string) {
  try {
    const anggotaDocRef = doc(db, 'anggota', idAnggota)
    await deleteDoc(anggotaDocRef)

    console.log('Anggota berhasil dihapus')
  } catch (error) {
    console.error('Error menghapus anggota:', error)
    throw error
  }
}
