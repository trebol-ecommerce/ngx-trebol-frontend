import { User } from 'src/app/models/entities/User';
import { MOCK_PEOPLE } from './mock-people.datasource';

export const MOCK_USERS: Partial<User>[] = [
  {
    name: 'admin',
    password: 'admin',
    createdOn: '2020-06-16',
    person: MOCK_PEOPLE[1],
    role: 'Administrator'
  }
];
