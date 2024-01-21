import { db } from '@/service/firebase-sdk'
import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore'

export const getCredential = async (email: string) => {
  let response: DocumentData | undefined
  const q = query(collection(db, 'akun'), where('email', '==', email))

  try {
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      console.log({ data })
      response = data
    })

    console.log({ response })

    return response
  } catch (error) {
    console.error('Error mencari data:', error)
  }
}
