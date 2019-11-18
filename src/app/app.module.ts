import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './ngrx';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { SharedModule } from './modules/shared/shared.module';
import { CreateAccountPageComponent } from './pages/create-account-page/create-account-page.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LoggedoutPageComponent } from './pages/loggedout-page/loggedout-page.component';
import { AccountSettingsPageComponent } from './pages/account-settings-page/account-settings-page.component';
import { CreateCheckPageComponent } from './pages/create-check-page/create-check-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { EditCheckPageComponent } from './pages/edit-check-page/edit-check-page.component';
import { CreateAccountEffects } from './pages/create-account-page/state_management/create-account.effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginEffects } from './pages/login/state_management/session.effects';
import { AuthInterceptor } from './interceptors/auth.interceptors';
import { ChecksEffect } from './pages/create-check-page/state_management/checks.effects';
import { UserEffects } from './pages/account-settings-page/state_management/users.effects';

@NgModule({
  declarations: [
    AppComponent,
    CreateAccountPageComponent,
    HomeComponent,
    LoginComponent,
    LoggedoutPageComponent,
    AccountSettingsPageComponent,
    CreateCheckPageComponent,
    DashboardPageComponent,
    EditCheckPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers, 
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    EffectsModule.forRoot([CreateAccountEffects, LoginEffects, ChecksEffect, UserEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
