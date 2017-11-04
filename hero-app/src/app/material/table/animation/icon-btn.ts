import { animate, state, style, transition, trigger } from '@angular/animations';

import { config } from './config';

export enum IconBtnAnimationState {
    ADD = 'add',
    BACK = 'back'
}

export const IconBtnAnimation = trigger(
    'iconBtn', [
        state(`${IconBtnAnimationState.ADD}, void`, style({ })),
        state(IconBtnAnimationState.BACK, style({
            left: '16px',
            top: '25px'
        })),
        transition(
            `${IconBtnAnimationState.ADD} <=> ${IconBtnAnimationState.BACK}`, [animate(config.timing)]
        ),
    ]
)
