/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

/**
 * Animation with two possible states: 'opaque' and 'transparent'
 * @param transitionTimeMs Time to fade in or out
 */
export function fadeInOut(transitionTimeMs: number): AnimationTriggerMetadata {
  return trigger('fadeInOut', [
    state('opaque', style({ opacity: 1 })),
    state('transparent', style({ opacity: 0 })),
    transition('opaque => transparent', animate(transitionTimeMs)),
    transition('transparent => opaque', animate(transitionTimeMs))
  ]);
}
