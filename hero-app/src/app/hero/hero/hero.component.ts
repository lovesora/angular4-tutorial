import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../net/service/http.service';
import { Request, RequestMethod } from '@angular/http';
import { CompilerConfig } from '@angular/compiler';

@Component({
    selector: 'app-hero',
    templateUrl: './hero.component.html',
    styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
    title = 'Hero Module';

    constructor(private httpService: HttpService) { }

    ngOnInit() {
    }

}
