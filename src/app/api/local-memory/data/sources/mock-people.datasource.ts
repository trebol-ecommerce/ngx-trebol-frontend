import { Person } from 'src/app/models/entities/Person';

export const MOCK_PEOPLE: Partial<Person>[] = [
  { name: 'Anónimo' },
  { name: 'Administrador', idCard: '4' },
  { name: 'Mánager', idCard: '3' },
  { name: 'Vendedor', idCard: '2' },
  { name: 'Cliente', idCard: '1' },
];
