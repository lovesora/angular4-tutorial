import { Component, OnInit } from '@angular/core';
import { Hero } from '../class/hero';
import { HeroService } from '../service/hero.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    hero: Hero;

    constructor(private heroService: HeroService, private route: ActivatedRoute, private location: Location) { }

    ngOnInit() {
        this.route.paramMap.switchMap((paramMap: ParamMap) => {
            return this.heroService.getById(+paramMap.get('id'));
        }).subscribe((hero: Hero) => {
            this.hero = hero;
        });
    }

    onClickSave() {
        this.heroService.update(this.hero)
            .then(() => {
                this.location.back();
            });
    }
}
