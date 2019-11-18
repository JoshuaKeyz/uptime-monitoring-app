import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from 'src/app/ngrx';
import { RegisterUser } from './state_management/create-account.actions';

@Component({
  selector: 'app-create-account-page',
  templateUrl: './create-account-page.component.html',
  styleUrls: ['./create-account-page.component.scss']
})
export class CreateAccountPageComponent implements OnInit {

  createAccountForm = new FormGroup({
    firstName: new FormControl('Joshua', Validators.required),
    lastName: new FormControl('Oguma', Validators.required),
    phone: new FormControl('0683489873', [Validators.required, Validators.min(10)]),
    password: new FormControl('mypassword', Validators.required),
    tosAgreement: new FormControl(true, Validators.required)
  });

  ngOnInit() {
  }
  createUser() {
    this.store.dispatch(new RegisterUser(this.createAccountForm.value));
  }
  constructor(private store: Store<State>) { }
}
