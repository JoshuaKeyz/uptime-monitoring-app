import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from 'src/app/ngrx';
import { LoginRequest } from './state_management/session.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      phone: new FormControl('0683489873', Validators.required),
      password: new FormControl('mypassword', Validators.required)
    })
  }
  onLogin() {
    this.store.dispatch(new LoginRequest(this.loginForm.value));
  }

}
