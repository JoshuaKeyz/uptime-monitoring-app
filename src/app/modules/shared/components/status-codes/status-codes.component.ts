import { Component, OnInit, forwardRef, Renderer2, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-status-codes',
  templateUrl: './status-codes.component.html',
  styleUrls: ['./status-codes.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(()=>StatusCodesComponent), multi: true}
  ]
})
export class StatusCodesComponent implements OnInit, ControlValueAccessor {

  statusCodes = [
    {status:'200', value: false},
    {status:'201', value: false},
    {status:'301', value: false},
    {status:'302', value: false},
    {status:'400', value: false},
    {status:'403', value: false},
    {status:'404', value: false},
    {status:'406', value: false},
    {status:'500', value: false}
  ]
  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }
  registeredOnChange;
  registeredOnTouch;
  ngOnInit() {
    
  }
  writeValue(obj: Array<number>){
    obj.forEach(item=>{
      for(let i = 0; i < this.statusCodes.length; i++) {
        if(item == parseInt(this.statusCodes[i].status)) {
          this.statusCodes[i].value = true;
        }
      }
    })
  }
  registerOnChange(fn: any) {
    this.registeredOnChange = fn;
  }
  registerOnTouched(fn: any) {
    this.registeredOnTouch = fn;
  }
  checkBoxAction(event, index) {
    this.statusCodes[index].value = !this.statusCodes[index].value
    let chosenStatuses = this.statusCodes.filter(item=> item.value)
      .map(item=> item.status)
    this.registeredOnChange(chosenStatuses);
  }
}
