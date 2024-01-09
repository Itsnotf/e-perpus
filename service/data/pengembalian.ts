import { db } from '../firebase-sdk'
import {
  addDoc,
  collection,
  deleteDoc,
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

export async function deletePengembalianById(idPengembalian: string) {
  try {
    const pengembalianDocRef = doc(db, 'pengembalian', idPengembalian)

    // Check if the document with the specified idPengembalian exists
    const docSnapshot = await getDoc(pengembalianDocRef)
    if (!docSnapshot.exists()) {
      console.error(`Document with idPengembalian ${idPengembalian} not found`)
      return
    }

    // Delete the document
    await deleteDoc(pengembalianDocRef)

    console.log(`Pengembalian with id ${idPengembalian} deleted successfully`)
  } catch (error) {
    console.error('Error deleting pengembalian:', error)
    throw error
  }
}

export async function getDataPengembalianById(idPengembalian: string) {
  try {
    const pengembalianDocRef = doc(db, 'pengembalian', idPengembalian)
    const pengembalianDocSnapshot = await getDoc(pengembalianDocRef)

    if (pengembalianDocSnapshot.exists()) {
      const data = {
        idPeminjaman: pengembalianDocSnapshot.data().idPeminjaman,
        dataPeminjaman: await getDataPeminjamanById(
          pengembalianDocSnapshot.data().idPeminjaman,
        ),
        status: pengembalianDocSnapshot.data().status,
        denda: pengembalianDocSnapshot.data().denda,
        tanggalPengembalian: new Date(pengembalianDocSnapshot.data().tanggalPengembalian),
      }

      return data;
    } else {
      console.error(`Pengembalian with id ${idPengembalian} not found`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching pengembalian data by ID:', error)
    throw error
  }
}


export async function getDataPengembalianByIdPeminjaman(idPeminjaman: string) {
  try {
    const q = query(
      collection(db, 'pengembalian'),
      where('idPeminjaman', '==', idPeminjaman),
    );

    const querySnapshot = await getDocs(q);
    const responsePromises = querySnapshot.docs.map(async (document) => {
      const data = {
        idPeminjaman: document.data().idPeminjaman,
        dataPeminjaman: await getDataPeminjamanById(
          document.data().idPeminjaman,
        ),
        status: document.data().status,
        denda: document.data().denda,
        tanggalPengembalian: new Date(document.data().tanggalPengembalian),
      };

      return data;
    });

    const response = await Promise.all(responsePromises);
    return response;
  } catch (error) {
    console.error('Error fetching pengembalian data by idPeminjaman:', error);
    throw error;
  }
}

export async function deletePengembalianByPeminjamanId(idPeminjaman: string) {
  try {
    const q = query(
      collection(db, 'pengembalian'),
      where('idPeminjaman', '==', idPeminjaman),
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size === 0) {
      console.error(`No pengembalian found for idPeminjaman ${idPeminjaman}`);
      return;
    }

    // Delete all pengembalian documents with the specified idPeminjaman
    const deletePromises = querySnapshot.docs.map(async (doc) => {
      await deleteDoc(doc.ref);
    });

    await Promise.all(deletePromises);

    console.log(`Pengembalian(s) for idPeminjaman ${idPeminjaman} deleted successfully`);
  } catch (error) {
    console.error('Error deleting pengembalian(s) by idPeminjaman:', error);
    throw error;
  }
}
