import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { RegisterUserModel } from '../domain-models/register-user';

@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {
  registerUser(userData: RegisterUserModel) {
    return this.httpClient.post('http://localhost:4000/users', userData, {
      observe: 'response',
    });
  }
  constructor(private httpClient: HttpClient){}
}