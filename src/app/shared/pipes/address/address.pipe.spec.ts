/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { pipe } from 'rxjs';
import { Address } from 'src/models/entities/Address';
import { AddressPipe } from './address.pipe';

class ExampleAdressMeta {
  example: Address;
  result: string;
}

describe('AddressPipe', () => {
  let pipe: AddressPipe;

  beforeEach(() => {
    pipe = new AddressPipe();
  })

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format adddresses', () => {
    const addresses: ExampleAdressMeta[] = [
      {
        example: {
          city: 'Santiago RM',
          firstLine: 'Av Libertador Bernardo O\'Higgins 1020',
          municipality: 'Santiago Centro',
          secondLine: 'Local 48'
        },
        result: 'Av Libertador Bernardo O\'Higgins 1020, Local 48, Santiago RM, Santiago Centro'
      },
      {
        example: {
          notes: 'Por favor trate el timbre con cuidado',
          city: 'Santiago RM',
          municipality: 'San Bernardo',
          firstLine: 'Victoria 351'
        },
        result: `Victoria 351, Santiago RM, San Bernardo (${pipe.commentLabel}: Por favor trate el timbre con cuidado)`
      }
    ];
    addresses.forEach(a => expect(pipe.transform(a.example)).toBe(a.result));
  });
});
