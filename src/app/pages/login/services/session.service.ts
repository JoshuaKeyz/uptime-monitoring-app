import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginRequestModel } from '../domain-models/login-request.model';
import { LoginSuccessModel } from '../domain-models/login-success.model';
import { Observable } from 'rxjs';
import { LoginFailureModel } from '../domain-models/login-failure.model';
import { LogoutRequestModel } from '../domain-models/logout-request.model';
import { LogoutFailureModel } from '../domain-models/logout-failure.model';
import { UpdateSessionModel } from '../domain-models/update-session.model';
import { UpdateSessionFailureModel } from '../domain-models/update-session-failure.model';
import { UpdatedSessionSuccessModel } from '../domain-models/updated-session-success.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  login(loginData: LoginRequestModel): Observable<LoginSuccessModel | LoginFailureModel> {
    return this.httpClient.post<LoginSuccessModel | LoginFailureModel>('http://localhost:4000/tokens', loginData);
  }
  logout(logoutData: LogoutRequestModel) : Observable<{} | LogoutFailureModel> {
    return this.httpClient.delete<{} | LogoutFailureModel>('http://localhost:4000/tokens', {
      params: new HttpParams().set('id', logoutData.id)
    })
  }
  updateSession(updateSessionData: UpdateSessionModel): Observable<UpdatedSessionSuccessModel | UpdateSessionFailureModel> {
    return this.httpClient.put<UpdatedSessionSuccessModel | UpdateSessionFailureModel>('http://localhost:4000/tokens', updateSessionData);
  }
  constructor(private httpClient: HttpClient) {}
}