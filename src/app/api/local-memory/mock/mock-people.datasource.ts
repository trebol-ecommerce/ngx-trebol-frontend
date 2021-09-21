/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Person } from 'src/app/models/entities/Person';

export const MOCK_PEOPLE: Partial<Person>[] = [
  { name: 'Administrador', idNumber: '4' },
  { name: 'Mánager', idNumber: '3' },
  { name: 'Vendedor', idNumber: '2' },
  { name: 'Cliente', idNumber: '1' },
  {
    name: 'Herminia J.',
    idNumber: '5529827-2',
    email: 'herminia@domain.com'
  },
  {
    name: 'Gloria S.',
    idNumber: '4436747-1',
    email: 'gloria@domain.com'
  },
  {
    name: 'Felipe N.',
    idNumber: '3380154-6',
    email: 'felipe@domain.com'
  },
  {
    name: 'Esteban Z.',
    idNumber: '2296001-7',
    email: 'esteban@domain.com'
  },
  {
    name: 'Anónimo',
    idNumber: '1111111-1',
    email: 'example@domain.com'
  },
  {
    name: 'Ayla H.',
    idNumber: '2222589-9',
    email: 'ayla@test.org'
  },
  {
    name: 'Benito F.',
    idNumber: '3327271-6',
    email: 'benito@test.org'
  },
  {
    name: 'Camelia M.',
    idNumber: '4441755-7',
    email: 'camelia@test.org'
  },
  {
    name: 'Daniel G.',
    idNumber: '5591163-8',
    email: 'daniel@test.org'
  }
];
