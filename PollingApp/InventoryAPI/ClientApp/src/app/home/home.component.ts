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

   imageObject = [
  {
    image: 'https://prod.smassets.net/assets/content/sm/SEO-online-polls-hero-557x400.webp',
    thumbImage: 'https://prod.smassets.net/assets/content/sm/SEO-online-polls-hero-557x400.webp',
    alt: 'Poll Slide 1',
    title: 'Create and Vote Instantly'
  },
  {
    image: '../../assets/poll.jpg',
    thumbImage: '../../assets/poll.jpg',
    alt: 'Poll Slide 2',
    title: 'Real-Time Insights'
  },
  {
     image: '../../assets/man.jpg',
    thumbImage: '../../assets/man.jpg',
    alt: 'Poll Slide 3',
    title: 'Easy to Use'
  }
];

   lottieOptions: AnimationOptions = {
      path: 'assets/vote.json',
      loop: true,
      autoplay: true
    };
      

}
