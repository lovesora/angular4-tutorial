import { Component, OnInit } from '@angular/core';
import { config, Config } from '../class/config';

@Component({
    selector: 'app-hero',
    templateUrl: './hero.component.html',
    styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
    config: Config;

    title = 'Hero Module';

    constructor() { }

    ngOnInit() {
        this.config = config;
    }

}
