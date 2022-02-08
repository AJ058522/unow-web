import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SessionData } from '../interfaces/session-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  autenticationState = new BehaviorSubject(false);
  updateUserData = new BehaviorSubject(false);

  constructor(
    public http: HttpClient
  ) { }

  login(formData: { email: string, password: string }) {

    return new Promise((resolve, reject) => {

      const response = this.http.post<SessionData>('login', formData);

      response.subscribe(data => {
        this.saveSession(data);
        this.authenticate();
        resolve(data);
      }, (err) => { reject(err); });

    });
  }

  isAuthenticated() {
    return this.autenticationState.value;
  }

  authenticate() {
    this.autenticationState.next(true);
  }

  unauthenticate() {
    this.autenticationState.next(false);
  }

  saveSession(sessionData: any) {
    localStorage.setItem("sessionData", JSON.stringify(sessionData));
    const franchises = sessionData.franchises;
    return true;
  }

  loadSession() {
    const session: string | null = localStorage.getItem("sessionData");
    let sessionData: SessionData = (session)? JSON.parse(session) : null;
    return sessionData;
  }

  removeSession() {
    localStorage.removeItem("sessionData");
    return true;
  }

  logout() {

    return new Promise((resolve, reject) => {

      const response = this.http.get('logout');

      response.subscribe(data => {
        this.removeSession();
        this.unauthenticate();
        resolve(data);
      }, (err) => {
        this.removeSession();
        this.unauthenticate();
      });

    });
  }

  register(formData: FormData) {

    return new Promise((resolve, reject) => {

      const response = this.http.post<SessionData>('register', formData);

      response.subscribe(data => {
        resolve(data);
      }, (err) => { reject(err); });

    });
  }

  updateUser(){
    this.updateUserData.next(true);
  }

  userUpdated(){
    this.updateUserData.next(false);
  }

}
