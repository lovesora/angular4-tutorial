import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { NgModule } from '@angular/core';
import { HeroComponent } from './hero/hero.component';

const routes: Routes = [{
    path: `hero`,
    component: HeroComponent,
    children: [{
        path: 'dashboard',
        component: DashboardComponent
    }, {
        path: 'heroes',
        component: HeroesComponent
    }, {
        path: 'hero/:id',
        component: HeroDetailComponent
    }]
}]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class HeroRoutingModule { }
