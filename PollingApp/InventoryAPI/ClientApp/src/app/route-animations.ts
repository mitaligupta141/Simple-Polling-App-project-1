import {
  trigger,
  transition,
  style,
  query,
  animate,
  group
} from '@angular/animations';

export const slideInAnimation = 
  trigger('routeAnimations', [
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          width: '100%',
          top: 0,
          left: 0
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      query(':leave', animate('300ms ease-out', style({ left: '100%' }))),
      query(':enter', animate('300ms ease-out', style({ left: '0%' }))),
    ])
  ]);
