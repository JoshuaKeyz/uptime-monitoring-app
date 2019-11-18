import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from 'src/app/ngrx';
import { GetUserRequest, UpdateUserNameRequest, UpdateUserPasswordRequest, DeleteUserRequest } from './state_management/users.actions';
import { UserModel } from './domain-models/user.model';

@Component({
  selector: 'app-account-settings-page',
  templateUrl: './account-settings-page.component.html',
  styleUrls: ['./account-settings-page.component.scss']
})
export class AccountSettingsPageComponent implements OnInit {

  accountSettingsForm: FormGroup;
  changePasswordForm: FormGroup;
  user: UserModel;

  ngOnInit() {
    this.store.dispatch(new GetUserRequest());
    this.store.select('user').subscribe((user: UserModel)=>{
      this.user = user;
      this.accountSettingsForm = new FormGroup({
        phone: new FormControl({value: user.phone, disabled: true}),
        firstName: new FormControl(user.firstName, Validators.required),
        lastName: new FormControl(user.lastName, Validators.required)
      });
      this.changePasswordForm = new FormGroup({
        password: new FormControl('', Validators.required)
      })
    })
  }
  onUpdateUserName() {
    let user = {...this.user}
    user.firstName = this.accountSettingsForm.value['firstName'];
    user.lastName = this.accountSettingsForm.value['lastName'];
    this.store.dispatch(new UpdateUserNameRequest(user))
  }

  onUpdateUserPassword() {
    this.store.dispatch(new UpdateUserPasswordRequest(this.changePasswordForm.value));
  }
  onDeleteUserAccount() {
    this.store.dispatch(new DeleteUserRequest(this.user._id))
  }
  constructor(private store: Store<State>) { }
}
