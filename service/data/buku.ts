import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../firebase-sdk'

// const dataBuku = {
//   nama: 'John Doe',
//   // sesuaikan sesuai kebutuhan
// };

export async function getDataBuku(kodeBuku: string) {
  try {
    const bukuDocRef = doc(db, 'buku', kodeBuku)
    const bukuSnapshot = await getDoc(bukuDocRef)

    if (bukuSnapshot.exists()) {
      return bukuSnapshot.data()
    } else {
      return null
    }
  } catch (error) {
    console.error('Error fetching buku data:', error)
    throw error
  }
}

export async function tambahBuku(dataBuku: any) {
  try {
    const bukuCollectionRef = collection(db, 'buku')
    const newBukuRef = await addDoc(bukuCollectionRef, dataBuku)

    return newBukuRef.id
  } catch (error) {
    console.error('Error menambahkan buku:', error)
    throw error
  }
}

export async function ubahBuku(kodeBuku: string, dataBuku: any) {
  try {
    const bukuDocRef = doc(db, 'buku', kodeBuku)
    await updateDoc(bukuDocRef, dataBuku)

    console.log('Buku berhasil diubah')
  } catch (error) {
    console.error('Error mengubah buku:', error)
    throw error
  }
}

export async function hapusBuku(kodeBuku: string) {
  try {
    const bukuDocRef = doc(db, 'buku', kodeBuku)
    await deleteDoc(bukuDocRef)

    console.log('Buku berhasil dihapus')
  } catch (error) {
    console.error('Error menghapus buku:', error)
    throw error
  }
}
