import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { statusCodeValidator } from 'src/app/validators/status-codes.validator';
import { Store } from '@ngrx/store';
import { State } from 'src/app/ngrx';
import { CreateCheckRequest } from './state_management/checks.actions';

@Component({
  selector: 'app-create-check-page',
  templateUrl: './create-check-page.component.html',
  styleUrls: ['./create-check-page.component.scss']
})
export class CreateCheckPageComponent implements OnInit {
  createCheckForm: FormGroup;
  successCodes = [200, 201, 301, 302, 400, 403, 404, 406, 500];
  
  ngOnInit() {
    this.createCheckForm = new FormGroup({
      protocol: new FormControl('HTTP', Validators.required),
      url: new FormControl('facebook.com', Validators.required),
      successCodes: new FormControl([200], {validators: [Validators.required, statusCodeValidator]}),
      method: new FormControl('GET', Validators.required),
      timeoutSeconds: new FormControl(5, [Validators.required])
    })
  }
  onSubmit(){
    this.store.dispatch(new CreateCheckRequest(this.createCheckForm.value))
  }
  constructor(private store: Store<State>) { }
}
