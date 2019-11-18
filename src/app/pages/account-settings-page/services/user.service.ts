import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserModel } from '../domain-models/user.model';
import { Observable } from 'rxjs';
import { ServerErrorModel } from '../domain-models/server-error.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUser(userPhone): Observable<UserModel | ServerErrorModel>{
    return this.httpClient.get<UserModel| ServerErrorModel>('http://localhost:4000/users', {
      params: new HttpParams().set('phone', userPhone)
    })
  }

  changeUserName(phone, firstName, lastName): Observable<UserModel | ServerErrorModel> {
    return this.httpClient.put<UserModel | ServerErrorModel>('http://localhost:4000/users', 
      {phone, firstName, lastName}
    )
  }

  changePasssword(phone, password): Observable<UserModel | ServerErrorModel> {
    console.log(password)
    return this.httpClient.put<UserModel | ServerErrorModel>('http://localhost:4000/users', 
    {
      phone, 
      password: password.password
    })
  }

  deleteUser(id: string): Observable<{} | ServerErrorModel> {
    return this.httpClient.delete<{} | ServerErrorModel>('http://localhost:4000/users', {
      params: new HttpParams().set('phone', id)
    })
  }

  constructor(private httpClient: HttpClient) {}
}