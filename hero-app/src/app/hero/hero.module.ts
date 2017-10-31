import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroRoutingModule } from './hero-routing.module';
import { FormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoeryDataService } from './service/in-memoery-data.service';
import { HeroComponent } from './hero/hero.component';
import { HeroService } from './service/hero.service';
import { HttpModule } from '@angular/http';
import { NetModule } from '../net/net.module';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        InMemoryWebApiModule.forRoot(InMemoeryDataService),
        HeroRoutingModule
    ],
    declarations: [DashboardComponent, HeroesComponent, HeroDetailComponent, HeroComponent],
    providers: [HeroService, ...NetModule.services],
    exports: [
        HeroRoutingModule
    ]
})
export class HeroModule { }
