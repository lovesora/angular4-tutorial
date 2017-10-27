import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { CompilerConfig } from '@angular/compiler';

@Component({
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    constructor(private heroService: HeroService) {}
    
    heroes: Hero[];
    
    async ngOnInit(): Promise<Hero[]> {
        let heroes = await this.heroService.getHeroes();
        return this.heroes = heroes.slice(1, 5);
    }
}