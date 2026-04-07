import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  user,
} from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private auth: Auth) {}

  login() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  logout() {
    return signOut(this.auth);
  }

  getUser() {
    return user(this.auth);
  }
}
