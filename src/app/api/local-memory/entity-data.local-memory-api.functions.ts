// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export function matchesStringProperty(it: any, propName: string, propValue: string): boolean {
  return (propName in it) && (it[propName] as string).toUpperCase().includes(propValue.toUpperCase());
}

export function matchesNumberProperty(it: any, propName: string, propValue: number): boolean {
  return (propName in it) && (it[propName] as number) === propValue;
}

export function matchesDateProperty(it: any, propName: string, propValue: Date): boolean {
  return (propName in it) && (it[propName] as Date).toString() === propValue.toString();
}

export function matchesIdProperty(it: any, propName: string, propValue: any): boolean {
  return (propName in it) && (it[propName]).id === propValue.id;
}
