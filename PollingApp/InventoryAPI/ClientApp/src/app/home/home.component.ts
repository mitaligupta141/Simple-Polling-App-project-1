import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('slideFadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(
          '600ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ]),
      transition(':leave', [
        animate(
          '400ms ease-in',
          style({ opacity: 0, transform: 'translateY(30px)' })
        )
      ])
    ]),
trigger('toggleFade', [
    transition(':enter', [
      style({ opacity: 0, transform: 'scale(0.9)' }),
      animate('400ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
    ]),
    transition(':leave', [
      animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.9)' }))
    ])
  ])

  ],
})
export class HomeComponent {

   images = [
    'https://prod.smassets.net/assets/content/sm/SEO-online-polls-hero-557x400.webp" alt="User',
    'https://prod.smassets.net/assets/content/sm/SEO-online-polls-hero-557x400.webp" alt="User',
    'https://prod.smassets.net/assets/content/sm/SEO-online-polls-hero-557x400.webp" alt="User',
  ]; 

   lottieOptions: AnimationOptions = {
      path: 'assets/vote.json', // ✅ Correct path inside /src/assets/
      loop: true,
      autoplay: true
    };
      

}
