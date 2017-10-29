import { Component, OnInit } from '@angular/core';
import { Hero } from '../class/hero';
import { HeroService } from '../service/hero.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    heroes: Hero[];

    constructor(private heroService: HeroService) { }

    async ngOnInit() {
        this.heroes = (await this.heroService.getList()).slice(1, 5);
    }
}
