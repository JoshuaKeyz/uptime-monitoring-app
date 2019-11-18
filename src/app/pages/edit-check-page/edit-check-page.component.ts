import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { statusCodeValidator } from 'src/app/validators/status-codes.validator';
import { ActivatedRoute } from '@angular/router';
import { CreateCheckSuccessModel } from '../create-check-page/domain-models/create-check-success.model';
import { Store } from '@ngrx/store';
import { State } from 'src/app/ngrx';
import { EditCheckRequest, DeleteCheckRequest } from '../create-check-page/state_management/checks.actions';

@Component({
  selector: 'app-edit-check-page',
  templateUrl: './edit-check-page.component.html',
  styleUrls: ['./edit-check-page.component.scss']
})
export class EditCheckPageComponent implements OnInit {

  editCheckForm: FormGroup;
  checkData;

  ngOnInit() {
    
    const checkData: CreateCheckSuccessModel = this.route.snapshot.data['check'];
    this.checkData = checkData;
    this.editCheckForm = new FormGroup({
      id: new FormControl({value: checkData.id, disabled: true}),
      protocol: new FormControl(checkData.protocol, Validators.required),
      url: new FormControl(checkData.url, Validators.required),
      successCodes: new FormControl(checkData.successCodes, {validators: [Validators.required, statusCodeValidator]}),
      method: new FormControl(checkData.method, Validators.required),
      timeoutSeconds: new FormControl(checkData.timeoutSeconds, [Validators.required])
    })
  }
  onEditCheck() {
    // console.log(this.editCheckForm.getRawValue())
    let oldData = {
      id: this.checkData['id'],
      protocol: this.checkData['protocol'],
      url: this.checkData['url'],
      successCodes: this.checkData['successCodes'],
      method: this.checkData['method'],
      timeoutSeconds: this.checkData['timeoutSeconds']
    }
    let sendRequest = JSON.stringify(oldData) === JSON.stringify(this.editCheckForm.getRawValue())
    this.store.dispatch(new EditCheckRequest(this.editCheckForm.getRawValue(), sendRequest))
  }

  onDeleteCheck() {
    this.store.dispatch(new DeleteCheckRequest(this.editCheckForm.getRawValue()))
  }
  constructor(
    private route: ActivatedRoute,
    private store: Store<State>
    ) { }
}
