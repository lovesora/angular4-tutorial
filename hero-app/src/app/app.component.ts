import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Hero } from './hero/class/hero.class';
import { State } from './ngrx/store/index.class';
import { selectHeroes } from './ngrx/reducer/hero.reducer';
import { HeroCreate } from './ngrx/action/hero.action';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Hero v0.0.2';
    heroes$ = this.store.select(selectHeroes);

    constructor(private store: Store<State>) { }

    onClickDetail = event => {
        this.store.dispatch(new HeroCreate({ ...event, id: event.id << 1 }));
    }

}
