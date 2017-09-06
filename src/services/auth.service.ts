import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { User } from '../models/user';
import { Store } from "@ngrx/store";
import { State } from '../reducers';
import * as app from '../actions/app';
import * as user from '../actions/user';

@Injectable()
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private store: Store<State>) { }

  getUserProfile(uid: string): FirebaseObjectObservable<User> {
    return this.db.object(`/users/${uid}`);
  }

  getFirebaseAuth() {
    return this.afAuth.authState;
  }

  createUserWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        return this.db.object(`/users/${response.uid}`).set(<User>{
          email: response.email,
          uid: response.uid,
          role: 'beta',
          creationDate: new Date().toJSON()
        });
      }).catch((err: any) => {
        let errorMessage = "Erreur lors de la création du compte";
        switch (err.code) {
          case "auth/email-already-in-use":
            errorMessage = "Cet email est déjà utilisé";
            break;
          case "auth/invalid-email":
            errorMessage = "Cet email n'est pas valide";
            break;
          case "auth/operation-not-allowed":
            errorMessage = "Opération non-autorisée";
            break;
          case "auth/weak-password":
            errorMessage = "Ce mot de passe n'est pas assez fort";
            break;
        }
        this.store.dispatch(new app.HasErrorAction({ message: errorMessage }));
      });
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch((err: any) => {
        let errorMessage = "Erreur lors de la connexion";
        switch (err.code) {
          case "auth/user-disabled":
            errorMessage = "Cet utilisateur a été désactivé";
            break;
          case "auth/invalid-email":
            errorMessage = "Cet email n'est pas valide";
            break;
          case "auth/user-not-found":
            errorMessage = "Cet utilisateur n'existe pas";
            break;
          case "auth/wrong-password":
            errorMessage = "Ce mot de passe est incorrect";
            break;
        }
        this.store.dispatch(new app.HasErrorAction({ message: errorMessage }));
      });
  }

  signOut(): void {
    this.afAuth.auth.signOut()
      .then(() => this.store.dispatch(new user.LogoutAction()));
  }
}
