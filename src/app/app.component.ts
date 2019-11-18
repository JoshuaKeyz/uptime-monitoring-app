import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, query, animate, animateChild, group } from '@angular/animations';
import { RouterOutlet, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { routeAnimation } from './animations/routeAnimation/route.animation';
import { Store } from '@ngrx/store';
import { State } from './ngrx';
import { UpdateSessionRequest } from './pages/login/state_management/session.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    routeAnimation    
  ]
})
export class AppComponent implements OnInit{
  title = 'uptimeMonitoring';
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
  }
  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent)=>{
      if(event instanceof NavigationEnd) {
        this.store.dispatch(new UpdateSessionRequest())
      }
    })
  }
  constructor(
    private router: Router,
    private store: Store<State>
  ) {}
}
