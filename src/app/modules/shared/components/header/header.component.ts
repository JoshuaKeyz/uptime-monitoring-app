import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/ngrx';
import { AuthTokenModel } from 'src/app/pages/login/domain-models/auth-token.model';
import { LogoutRequest } from 'src/app/pages/login/state_management/session.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private store: Store<State>) { }
  token: AuthTokenModel;
  isAuth: boolean;
  ngOnInit() {
    this.store.select("session").subscribe(
      session=> {
        this.token = session.authToken
        this.isAuth = session.isAuth;
      }  
    )
  }
  onLogout() {
    this.store.dispatch(new LogoutRequest(this.token));
  }

}
