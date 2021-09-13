import { Customer } from 'src/app/models/entities/Customer';

export const MOCK_CUSTOMERS: Partial<Customer>[] = [
  {
    person: {
      name: 'Anónimo',
      idCard: '1111111-1',
      address: 'Calle Sin Salida 47',
      email: 'example@test.org'
    }
  },
  {
    person: {
      name: 'Ayla H.',
      idCard: '2222589-9',
      address: 'Hacienda El Tintero 370',
      email: 'ayla@test.org'
    }
  },
  {
    person: {
      name: 'Benito F.',
      idCard: '3327271-6',
      address: 'Pedro Loza 533',
      email: 'benito@test.org'
    }
  },
  {
    person: {
      name: 'Camelia M.',
      idCard: '4441755-7',
      address: 'Rio Panuco, 128',
      email: 'camelia@test.org'
    }
  },
  {
    person: {
      name: 'Daniel G.',
      idCard: '5591163-8',
      address: 'Constitucion 27',
      email: 'daniel@test.org'
    }
  }
];
