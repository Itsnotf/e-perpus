import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase-sdk'

export const countAnggotaByKategoriKelas = async (
  kelas: string,
  kategoriKelas: 'IPA' | 'IPS',
) => {
  try {
    const collectionRef = collection(db, 'anggota')

    const q = query(
      collectionRef,
      where('kelas', '==', kelas),
      where('kategoriKelas', '==', kategoriKelas),
    )

    // Fetch documents that match the query
    const querySnapshot = await getDocs(q)

    // Count the number of documents
    const count = querySnapshot.size

    // console.log({ count, kelas, kategoriKelas })

    return count
  } catch (error) {
    console.error('Terjadi kesalahan:', error)
    throw error
  }
}
