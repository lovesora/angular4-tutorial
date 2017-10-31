import { HeroState, initialState } from '../store/state.class';
import { Action, createSelector, createFeatureSelector } from '@ngrx/store';
import { AT_HERO_CREATE, AT_HERO_UPDATE, AT_HERO_DELETE, Actions } from '../action/hero.action';
import { Hero } from '../../hero/class/hero.class';

export function heroReducer(state: HeroState = initialState, action: Actions): HeroState {
    switch (action.type) {
        case AT_HERO_CREATE: {
            return {
                ...state,
                heroes: [...state.heroes, action.payload]
            }
        }
        case AT_HERO_UPDATE: {
            return {
                ...state,
                heroes: state.heroes.map(v => {
                    if (v.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return v;
                    }
                })
            }
        }
        case AT_HERO_DELETE: {
            return {
                ...state,
                heroes: state.heroes.filter(v => v.id !== action.payload.id)
            }
        }
        default: {
            return state;
        }
    }
}

export const selectHeroState = createFeatureSelector<HeroState>('heroState');

export const selectHeroes = createSelector(
    selectHeroState,
    state => state.heroes
);
