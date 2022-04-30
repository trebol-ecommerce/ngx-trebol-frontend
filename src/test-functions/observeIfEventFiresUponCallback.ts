/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { EventEmitter } from "@angular/core";
import { EMPTY, merge, timer } from "rxjs";
import { defaultIfEmpty, finalize, map, take, takeUntil } from "rxjs/operators";

/**
 * Boilerplate for checking if an EventEmitter emits a value when executing a callback function.
 * @param eventEmitter
 * @param callbackFunction
 * @param shortCircuit$ An observable whose emission will stop listening for values
 * @returns An Observable that emits a single boolean value as soon as possible.
 * This observable emits true when the event did emit a value, and false if it did not.
 */
export function observeIfEventFiresUponCallback(eventEmitter: EventEmitter<any>, callbackFunction: () => void, shortCircuit$ = timer(1)) {
  return merge(
    eventEmitter.pipe(
      map(() => true)
    ),
    EMPTY.pipe(
      finalize(callbackFunction)
    )
  ).pipe(
    takeUntil(shortCircuit$),
    defaultIfEmpty(false),
    take(1)
  );
}
