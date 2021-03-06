import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../class/hero.class';
import { HeroService } from '../service/hero.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
    heroName: string;
    @Input() heroes: Hero[];
    selectedHero: Hero;

    @Output() detail: EventEmitter<Hero> = new EventEmitter();

    constructor(private heroService: HeroService, private router: Router, private route: ActivatedRoute) { }

    async ngOnInit() {
        try {
            // this.heroes = await this.heroService.getList();
        } catch(e) {
            this.heroes = [];
        }
    }

    onClickAdd(name: string): void {
        this.heroService.create(name).then((hero: Hero) => {
            this.heroes.push(hero);
        });
    }

    onClickDetail(): void {
        this.router.navigate(['hero', this.selectedHero.id], {relativeTo: this.route.parent});
    }

    onClickHero(hero: Hero): void {
        this.selectedHero = hero;
        this.detail.emit(hero);
    }

    onClickDelete(hero: Hero): void {
        if (this.selectedHero === hero) this.selectedHero = null;

        this.heroService.delete(hero.id).then(() => {
            this.heroes = this.heroes.filter(_hero => _hero !== hero);
        })
    }
}
