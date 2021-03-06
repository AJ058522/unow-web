import { HttpClient, HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../interfaces/user';
import { Params, ParamsString } from '../../../shared/classes/params/params';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ParamsString = new ParamsString;
  private httpWithoutInterceptor: HttpClient;

  constructor(
    public http: HttpClient,
    public httpBackend: HttpBackend
  ) {
    this.httpWithoutInterceptor = new HttpClient(httpBackend);
   }

  users(userId: string = null, params: Params = null) {

    const getParams: string = (params) ? this.ParamsString.setParamsString(params) : '';
    const URL: string = (!userId) ? 'users' : 'users/' + userId;

    return new Promise((resolve, reject) => {
      const response = this.http.get<User>(URL + getParams);
      response.subscribe(data => {
        resolve(data);
      });
    });
  }

  store(formData: FormData) {
    return new Promise((resolve, reject) => {
      const response = this.http.post('users', formData);
      response.subscribe(data => {
        resolve(data);
      }, (err) => { reject(err); });
    });
  }

  update(userId: string, formData: FormData) {
    return new Promise((resolve, reject) => {
      const response = this.http.put('users/' + userId, formData);
      response.subscribe(data => {
        resolve(data);
      }, (err) => { reject(err); });
    });
  }

  destroy(userId: string) {
    return new Promise((resolve, reject) => {
      const response = this.http.delete('users/' + userId);
      response.subscribe(data => {
        resolve(data);
      });
    });
  }

  positions() {
    const URL: string = 'https://ibillboard.com/api/positions';

    return new Promise((resolve, reject) => {
      const response = this.httpWithoutInterceptor.get(URL);
      response.subscribe(data => {
        resolve(data);
      });
    });
  }

}
