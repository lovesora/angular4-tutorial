import { config } from './config';

import { animate, state, style, transition, trigger } from '@angular/animations';

export enum CollapseExpandedAnimationState {
    COLLAPSE = 'COLLAPSE',
    EXPANDED = 'EXPANDED'
}

export const CollapseExpandedAnimation = trigger(
    'collapseExpanded', [
        state(`${CollapseExpandedAnimationState.COLLAPSE}, void`, style({
            height: 0
        })),
        state(CollapseExpandedAnimationState.EXPANDED, style({

        })),
        transition(
            `${CollapseExpandedAnimationState.COLLAPSE} <=> ${CollapseExpandedAnimationState.EXPANDED}`, [animate(config.timing)]
        ),
    ]
)
