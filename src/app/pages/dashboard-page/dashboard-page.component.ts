import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/ngrx';
import { selectAllChecks } from '../create-check-page/state_management/checks.reducer';
import { GetAllChecks } from '../create-check-page/state_management/checks.actions';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  checks$;
  
  ngOnInit() {
    this.checks$ = this.store.pipe(
      select(selectAllChecks)
    )
    this.store.dispatch(new GetAllChecks())
  }
  editCheck(checkId: string) {
    
  }
  constructor(private store: Store<State>) { }
}
