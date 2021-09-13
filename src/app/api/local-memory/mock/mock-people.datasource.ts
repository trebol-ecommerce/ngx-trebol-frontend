import { Person } from 'src/app/models/entities/Person';

export const MOCK_PEOPLE: Partial<Person>[] = [
  { name: 'Anónimo' },
  { name: 'Administrador', idNumber: '4' },
  { name: 'Mánager', idNumber: '3' },
  { name: 'Vendedor', idNumber: '2' },
  { name: 'Cliente', idNumber: '1' },
];
