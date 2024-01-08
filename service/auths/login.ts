import { firebaseApp } from "../firebase-sdk";
import { getApps } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

if (!getApps().length) {
  firebaseApp;
}

const FirebaseAuth = getAuth();

export const Authentication = () => {
  return FirebaseAuth;
};

export const SignUp = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(FirebaseAuth, email, password);
};

export const SignIn = async (email: string, password: string) => {
  await signInWithEmailAndPassword(FirebaseAuth, email, password);
};

export const SignOut = async () => {
  await signOut(FirebaseAuth);
};

export const GetSignInErrorMessage = (code: any) => {
  switch (code) {
    case "auth/user-not-found":
      return "Email Tidak Ditemukan";
    case "auth/wrong-password":
    default:
      return "Email atau Password Salah";
  }
};
