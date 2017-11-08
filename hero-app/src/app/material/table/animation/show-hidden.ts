import { config } from './config';

import { animate, state, style, transition, trigger } from '@angular/animations';

export enum ShowHiddenAnimationState {
    SHOW = 'show',
    HIDDEN = 'hidden'
}

export const showHiddenAnimation = trigger(
    'showHidden', [
        state(ShowHiddenAnimationState.SHOW, style({ opacity: 1 })),
        state(ShowHiddenAnimationState.HIDDEN, style({ opacity: 0 })),
        transition(
            `${ShowHiddenAnimationState.SHOW} <=> ${ShowHiddenAnimationState.HIDDEN}`, [animate(config.timing)]
        )
    ]
)
