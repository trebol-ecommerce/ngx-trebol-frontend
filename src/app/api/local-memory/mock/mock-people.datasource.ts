/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Person } from 'src/app/models/entities/Person';

export const MOCK_PEOPLE: Partial<Person>[] = [
  { firstName: 'Administrador', lastName: 'Prueba', idNumber: '4' },
  { firstName: 'Mánager', lastName: 'Prueba', idNumber: '3' },
  { firstName: 'Vendedor', lastName: 'Prueba', idNumber: '2' },
  { firstName: 'Cliente', lastName: 'Prueba', idNumber: '1' },
  {
    firstName: 'Herminia',
    lastName: 'J.',
    idNumber: '5529827-2',
    email: 'herminia@domain.com'
  },
  {
    firstName: 'Gloria',
    lastName: 'S.',
    idNumber: '4436747-1',
    email: 'gloria@domain.com'
  },
  {
    firstName: 'Felipe',
    lastName: 'N.',
    idNumber: '3380154-6',
    email: 'felipe@domain.com'
  },
  {
    firstName: 'Esteban',
    lastName: 'Z.',
    idNumber: '2296001-7',
    email: 'esteban@domain.com'
  },
  {
    firstName: 'Anónimo',
    lastName: 'P.',
    idNumber: '1111111-1',
    email: 'example@domain.com'
  },
  {
    firstName: 'Ayla',
    lastName: 'H.',
    idNumber: '2222589-9',
    email: 'ayla@test.org'
  },
  {
    firstName: 'Benito',
    lastName: 'F.',
    idNumber: '3327271-6',
    email: 'benito@test.org'
  },
  {
    firstName: 'Camelia',
    lastName: 'M.',
    idNumber: '4441755-7',
    email: 'camelia@test.org'
  },
  {
    firstName: 'Daniel',
    lastName: 'G.',
    idNumber: '5591163-8',
    email: 'daniel@test.org'
  }
];
