import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { User } from '../models/model.user';
import { getFirestore, setDoc, doc} from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  authService = inject(AngularFireAuth);


  getLogin(user: User){
    return signInWithEmailAndPassword(getAuth(),user.email, user.password);
  }

  SingUp(user: User){
    return createUserWithEmailAndPassword(getAuth(),user.email, user.password);
  }

  updateUser(displayName: string){
    return updateProfile(getAuth().currentUser, {displayName})
  }

  setDocument(path: string, data: any){
    return setDoc(doc(getFirestore(), path), data)
  }



}
