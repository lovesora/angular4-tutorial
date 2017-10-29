import { Component, OnInit } from '@angular/core';
import { Hero } from '../class/hero';
import { HeroService } from '../service/hero.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
    private heroes: Hero[];
    private selectedHero: Hero;

    constructor(private heroService: HeroService, private router: Router) { }

    async ngOnInit() {
        this.heroes = await this.heroService.getList();
    }

    onClickHero(hero: Hero) {
        this.selectedHero = hero;
    }

    gotoDetail() {
        // ?
        this.router.navigate(['/hero', this.selectedHero.id]);
    }

    add(name: string) {
        this.heroService.create({name} as Hero)
            .then(hero => {
                this.heroes.push(hero);
            });
    }

    delete(hero: Hero) {
        this.heroService.delete(hero.id)
            .then(() => {
                this.heroes = this.heroes.filter(v => v !== hero);
                if (hero === this.selectedHero) this.selectedHero = null;
            });
    }
}
