import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateCheckRequestModel } from '../domain-models/create-check-request.model';
import { Observable } from 'rxjs';
import { CreateCheckSuccessModel } from '../domain-models/create-check-success.model';
import { CreateCheckErrorModel } from '../domain-models/create-check-error.model';

@Injectable({
  providedIn: 'root'
})
export class ChecksService {
  createCheck(check: CreateCheckRequestModel): Observable<CreateCheckSuccessModel | CreateCheckErrorModel> {
    return this.httpClient.post<CreateCheckSuccessModel| CreateCheckErrorModel>(
      'http://localhost:4000/checks',
      check
    )
  }
  getChecks(phone: string) {
    return this.httpClient.get<Array<CreateCheckSuccessModel> | CreateCheckErrorModel>(
      'http://localhost:4000/all-checks',
      {
        params: new HttpParams().set('phone', phone)
      }
    );
  }
  editCheck(check: CreateCheckSuccessModel) {
    return this.httpClient.put<CreateCheckSuccessModel>(
      'http://localhost:4000/checks',
      check
    )
  }
  deleteCheck(id: string) {
    return this.httpClient.delete<{id: string}>('http://localhost:4000/checks', {
      params: new HttpParams().set('id', id)
    })
  }
  constructor(private httpClient: HttpClient) {}
}