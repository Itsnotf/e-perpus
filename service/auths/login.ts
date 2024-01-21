import { getCredential } from '@/utils/cookie'
import { db, firebaseApp } from '../firebase-sdk'
import { getApps } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth/cordova'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { cookies } from 'next/headers'

if (!getApps().length) {
  firebaseApp
}

const FirebaseAuth = getAuth()

export const Authentication = () => {
  return FirebaseAuth
}

export const SignUp = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(FirebaseAuth, email, password)
}

export const SignIn = async (email: string, password: string) => {
  await signInWithEmailAndPassword(FirebaseAuth, email, password)
}

export const SignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  await signInWithPopup(FirebaseAuth, provider)
}

export const SignOut = async () => {
  await signOut(FirebaseAuth)
}

export const GetSignInErrorMessage = (code: any) => {
  switch (code) {
    case 'auth/user-not-found':
      return 'Email Tidak Ditemukan'
    case 'auth/wrong-password':
    default:
      return 'Email atau Password Salah'
  }
}
