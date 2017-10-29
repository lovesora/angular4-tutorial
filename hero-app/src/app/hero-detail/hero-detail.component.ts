import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../class/hero';
import { HeroService } from '../service/hero.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    hero: Hero;

    constructor(private heroService: HeroService, private route: ActivatedRoute, private location: Location) { }

    ngOnInit() {
        this.route.paramMap
            .switchMap((paramMap: ParamMap) => this.heroService.getById(+paramMap.get('id')))
            .subscribe(hero => this.hero = hero);
    }

    save(): void {
        this.heroService.update(this.hero).then(() => {
            this.location.back();
        });
    }
}
