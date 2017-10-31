import { Injectable } from "@angular/core";
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { AT_HERO_CREATE, HeroCreate } from '../action/hero.action';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/exhaustMap';

@Injectable()
export class HeroEffect {
    constructor (private actions$: Actions) { }

    @Effect()
    add$ = this.actions$
        .ofType(AT_HERO_CREATE)
        .map((action: HeroCreate) => action.payload)
        // .exhaustMap(hero => {

        // })

}
