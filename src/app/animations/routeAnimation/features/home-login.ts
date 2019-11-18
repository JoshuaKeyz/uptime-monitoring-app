import { style, transition, query, animate, group} from '@angular/animations';

export const homeLogin = transition('HomePage <=> LoginPage', [
  style({
    position: 'relative'
  }),
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
    style({opacity: '0'})
  ]),
  group([
    query(':leave', [
      animate('0.5s ease-out', style({opacity: '0'}))
    ]),
    query(':enter', [
      animate('0.5s ease-out', style({opacity: '1'}))
    ])
  ]),
])