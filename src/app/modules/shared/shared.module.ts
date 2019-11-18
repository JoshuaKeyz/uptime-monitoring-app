import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { StatusCodesComponent } from './components/status-codes/status-codes.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    StatusCodesComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    StatusCodesComponent
  ]
})
export class SharedModule { }
