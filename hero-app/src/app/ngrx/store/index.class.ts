import { HeroState } from './state.class';
import { heroReducer } from '../reducer/hero.reducer';

export interface State {
    heroState: HeroState
}

export const reducers = {
    heroState: heroReducer
}

