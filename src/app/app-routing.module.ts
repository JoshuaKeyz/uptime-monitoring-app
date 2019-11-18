import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateAccountPageComponent } from './pages/create-account-page/create-account-page.component';
import { LoginComponent } from './pages/login/login.component';
import { LoggedoutPageComponent } from './pages/loggedout-page/loggedout-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { EditCheckPageComponent } from './pages/edit-check-page/edit-check-page.component';
import { AccountSettingsPageComponent } from './pages/account-settings-page/account-settings-page.component';
import { CreateCheckPageComponent } from './pages/create-check-page/create-check-page.component';
import { SessionGuard } from './guards/session.guard';
import { NotAuthenticated } from './guards/not-authenticated.guard';
import { ChecksResolverService } from './resolvers/checks-resolver.service';


const routes: Routes = [
  {
    path: '', 
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      animation: 'HomePage'
    },
    canActivate: [
      NotAuthenticated
    ]
  },
  {
    path: 'create-account',
    component: CreateAccountPageComponent,
    data: {
      animation: 'CreateAccountPage'
    },
    canActivate: [
      NotAuthenticated
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      animation: 'LoginPage'
    },
    canActivate: [
      NotAuthenticated
    ]
  }, {
    path: 'logout',
    component: LoggedoutPageComponent,
    data: {
      animation: 'LogoutPage'
    }
  }, {
    path: 'dashboard',
    component: DashboardPageComponent,
    data: {
      animation: 'DashboardPage'
    },
    canActivate: [
      SessionGuard
    ]
  }, 
  {
    path: 'edit-check/:checkId',
    component: EditCheckPageComponent,
    data: {
      animation: 'EditCheckPage'
    },
    canActivate: [
      SessionGuard
    ],
    resolve: {
      check: ChecksResolverService
    }
  }, 
  {
    path: 'account-settings',
    component: AccountSettingsPageComponent,
    data: {
      animation: 'AccountSettingsPage'
    },
    canActivate: [
      SessionGuard
    ]
  },
  {
    path: 'create-check',
    component: CreateCheckPageComponent,
    data: {
      animation: 'CreateCheckPage'
    },
    canActivate: [
      SessionGuard
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
