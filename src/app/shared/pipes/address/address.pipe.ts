import { Pipe, PipeTransform } from '@angular/core';
import { Address } from 'src/app/models/Address';

@Pipe({ name: 'address' })
export class AddressPipe implements PipeTransform {

  transform(value: Address, ...args: unknown[]): unknown {
    return (value.firstLine
      + (value.secondLine? ', ' + value.secondLine : '')
      + ', ' + value.city
      + ', ' + value.municipality
      + (value.notes? ' (Comentario: ' + value.notes + ')' : ''));
  }

}
