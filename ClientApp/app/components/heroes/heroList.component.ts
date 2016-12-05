import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroesService } from './heroes.service';

@Component({
    selector: 'heroList',
    templateUrl: './heroList.component.html',
    styleUrls: ['./heroList.component.css']
})
export class HeroListComponent implements OnInit {
    public selectedHero: Hero;
    public heroes: Hero[];

    constructor(private heroesService: HeroesService) {
    }

    ngOnInit() {
        this.heroesService
            .loadAll()
            .subscribe(res => {
                this.heroes = res;
            });
    }

    selectHero(hero: Hero): void {
        this.selectedHero = hero;
    }

}