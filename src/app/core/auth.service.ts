import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async checkAuth() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log('CHECK AUTH : ', user);
      return user;
    } catch(err) {
      throw err;
    }
  }

  async signIn(email:string,password:string) {
    try {
      const user = await Auth.signIn(email,password);
      console.log('USER SIGNED IN : ', user);
      return user;
    } catch(err) {
      throw err;
    }
  }

  async signout() {
    try {
      await Auth.signOut()
    } catch(err) {
      throw err;
    }
  }
}
