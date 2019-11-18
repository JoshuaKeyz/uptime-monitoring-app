import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { State } from '../ngrx';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.store.select('session').pipe(
        map(session=> session.isAuth)
      )
  }
  constructor(private store: Store<State>) { }
}
