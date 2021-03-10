import { trigger, state, style, transition, animate, AnimationTriggerMetadata } from '@angular/animations';

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
