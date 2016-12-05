import { Component, Input } from '@angular/core';
import { Hero } from './hero';

@Component({
  selector: 'my-hero-detail',
    templateUrl: './heroDetail.component.html',
    styleUrls: ['./heroDetail.component.css']
})
export class HeroDetailComponent {
    @Input()
    hero: Hero;
}