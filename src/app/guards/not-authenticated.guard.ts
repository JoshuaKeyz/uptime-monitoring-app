import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { State } from '../ngrx';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotAuthenticated implements CanActivate{
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<UrlTree|boolean> {
      return this.store.select('session').pipe(
        map(session=>{
          if(!session.isAuth) {
            return true;
          }
          return this.router.createUrlTree(['/dashboard'])
        })
      )
  }
  constructor(private store: Store<State>, private router: Router) { }
}