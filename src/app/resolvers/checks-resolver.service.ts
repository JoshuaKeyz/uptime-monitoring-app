import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CreateCheckSuccessModel } from '../pages/create-check-page/domain-models/create-check-success.model';
import { Observable, EMPTY, of } from 'rxjs';
import { ChecksService } from '../pages/create-check-page/services/checks.service';
import { Store, select } from '@ngrx/store';
import { State } from '../ngrx';
import { selectById } from '../pages/create-check-page/state_management/checks.reducer';
import { map, mergeMap, catchError, switchMap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChecksResolverService implements Resolve<CreateCheckSuccessModel> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CreateCheckSuccessModel> | Observable<never> {
    let id = route.paramMap.get('checkId');

    return this.store.pipe(
      select(selectById, {id}),
      first(),
      mergeMap(data => {
        if (data) {
          return of(data)
        } else {
          this.router.navigate(['/dashboard'])
          return EMPTY;
        }  
      })
    )
  }
  constructor(private store: Store<State>, private router: Router) {}
}