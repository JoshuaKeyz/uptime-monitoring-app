import { style, transition, query, animate, group} from '@angular/animations';

export const homeCreateAccount = transition('HomePage => CreateAccountPage', [
  style({
    position: 'relative',
  }),
  query('.create-account__form-control', [
    style({
      display: 'block'
    })
  ]),
  query('app-footer', [
    style({
      position: 'absolute',
      width: '100%',
      top: '800px'
    })
  ]),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%'
    })
  ]),
  query(':enter', [
    style({left: '-100%'})
  ]),
  group([
    query(':leave', [
      animate('1s ease-out', style({left: '100%'}))
    ]),
    query(':enter', [
      animate('1s ease-out', style({left: '0%'}))
    ])
  ]),
  // query(':enter', animateChild())
])