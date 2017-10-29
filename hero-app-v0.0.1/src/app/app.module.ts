import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MemoryDataService } from './service/memory-data.service';
import { HttpModule } from '@angular/http';
import { HeroService } from './service/hero.service';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        HeroDetailComponent,
        DashboardComponent,
        HeroesComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(MemoryDataService)
    ],
    providers: [HeroService],
    bootstrap: [AppComponent]
})
export class AppModule { }
