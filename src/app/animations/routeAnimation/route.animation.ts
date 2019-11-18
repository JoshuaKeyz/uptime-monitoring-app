import { trigger } from '@angular/animations';
import { homeCreateAccount } from './features/home-createAccount';
import { createAccountHome } from './features/createAccount-home';
import { homeLogin } from './features/home-login';

export let routeAnimation = trigger('routeAnimation', [
  homeCreateAccount,
  createAccountHome,
  homeLogin
])
