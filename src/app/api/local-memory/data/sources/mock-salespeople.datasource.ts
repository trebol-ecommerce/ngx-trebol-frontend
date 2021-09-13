import { Salesperson } from 'src/app/models/entities/Salesperson';

export const MOCK_SALESPEOPLE: Partial<Salesperson>[] = [
  {
    person: {
      name: 'Anónimo',
      idCard: '1111111-1',
      address: 'Ejemplo 275',
      email: 'example@domain.com'
    }
  },
  {
    person: {
      name: 'Esteban Z.',
      idCard: '2296001-7',
      address: 'Carre Transistmica 9684',
      email: 'esteban@domain.com'
    }
  },
  {
    person: {
      name: 'Felipe N.',
      idCard: '3380154-6',
      address: 'Edison 2525',
      email: 'felipe@domain.com'
    }
  },
  {
    person: {
      name: 'Gloria S.',
      idCard: '4436747-1',
      address: 'Gutemberg 179',
      email: 'gloria@domain.com'
    }
  },
  {
    person: {
      name: 'Herminia J.',
      idCard: '5529827-2',
      address: 'Jose Puga 1735',
      email: 'herminia@domain.com'
    }
  }
];
