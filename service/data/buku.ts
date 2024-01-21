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
import { TBuku } from '@/types/buku'

// const dataBuku = {
//   nama: 'John Doe',
//   // sesuaikan sesuai kebutuhan
// };

export async function getDataBukuAll() {
  try {
    const bukuCollectionRef = collection(db, 'buku')
    const bukuSnapshot = await getDocs(bukuCollectionRef)

    const bukuData: any = []
    bukuSnapshot.forEach((doc) => {
      bukuData.push({ idBuku: doc.id, ...doc.data() })
    })

    return bukuData
  } catch (error) {
    console.error('Error fetching all buku data:', error)
    throw error
  }
}

export async function getDataBuku(idBuku: string) {
  try {
    const bukuDocRef = doc(db, 'buku', idBuku)
    const bukuSnapshot = await getDoc(bukuDocRef)

    if (bukuSnapshot.exists()) {
      return { idBuku: bukuSnapshot.id, ...bukuSnapshot.data() }
    } else {
      return null
    }
  } catch (error) {
    console.error('Error fetching buku data:', error)
    throw error
  }
}

export async function tambahBuku(dataBuku: TBuku) {
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

export async function hapusBuku(idBuku: string) {
  try {
    const bukuDocRef = doc(db, 'buku', idBuku)
    await deleteDoc(bukuDocRef)

    console.log('Buku berhasil dihapus')
  } catch (error) {
    console.error('Error menghapus buku:', error)
    throw error
  }
}
