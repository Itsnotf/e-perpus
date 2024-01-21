import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore'
import { db } from '../firebase-sdk'
import { TAnggota } from '@/types/anggota'

// const dataAnggota = {
//   nama: 'John Doe',
//   // sesuaikan sesuai kebutuhan
// };

export async function getDataAnggotaAll() {
  try {
    const anggotaCollectionRef = collection(db, 'anggota')
    const anggotaSnapshot = await getDocs(anggotaCollectionRef)

    const anggotaData: any = []
    anggotaSnapshot.forEach((doc) => {
      anggotaData.push({ idAnggota: doc.id, ...doc.data() })
    })

    return anggotaData
  } catch (error) {
    console.error('Error fetching all anggota data:', error)
    throw error
  }
}

export async function getDataAnggota(idAnggota: string) {
  try {
    const anggotaDocRef = doc(db, 'anggota', idAnggota)
    const anggotaSnapshot = await getDoc(anggotaDocRef)

    if (anggotaSnapshot.exists()) {
      return anggotaSnapshot.data()
    } else {
      throw 'Data not found'
    }
  } catch (error) {
    console.error('Error fetching anggota data:', error)
    throw error
  }
}

export async function tambahAnggota(dataAnggota: TAnggota) {
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
