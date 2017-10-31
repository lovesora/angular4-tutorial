import { Action } from '@ngrx/store';
import { Hero } from '../../hero/class/hero.class';
export const AT_HERO_CREATE = 'AT_HERO_CREATE';
export const AT_HERO_UPDATE = 'AT_HERO_UPDATE';
export const AT_HERO_DELETE = 'AT_HERO_DELETE';

export class HeroCreate implements Action {
    readonly type = AT_HERO_CREATE;

    constructor (public payload: Hero) { }
}

export class HeroUpdate implements Action {
    readonly type = AT_HERO_UPDATE;

    constructor (public payload: Hero) { }
}

export class HeroDelete implements Action {
    readonly type = AT_HERO_DELETE;

    constructor (public payload: Hero) { }
}

export type Actions = HeroCreate | HeroUpdate | HeroDelete;
