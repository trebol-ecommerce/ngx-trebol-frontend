// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { AbstractEntity } from 'src/app/models/AbstractEntity';

export function matchesStringProperty(it: any, propName: string, propValue: string): boolean {
  return (propName in it) && (it[propName] as string).toUpperCase().includes(propValue.toUpperCase());
}

export function matchesNumberProperty(it: any, propName: string, propValue: number): boolean {
  return (propName in it) && (it[propName] as number) === propValue;
}

export function matchesDateProperty(it: any, propName: string, propValue: Date): boolean {
  return (propName in it) && (it[propName] as Date).toString() === propValue.toString();
}

export function matchesAbstractEntityProperty(it: any, propName: string, propValue: AbstractEntity): boolean {
  return (propName in it) && (it[propName] as AbstractEntity).id === propValue.id;
}
