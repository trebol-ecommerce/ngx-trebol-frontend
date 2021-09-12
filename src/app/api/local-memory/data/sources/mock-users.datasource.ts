import { User } from 'src/app/models/entities/User';

export const MOCK_USERS: Partial<User>[] = [
  {
    id: 1,
    name: 'admin',
    password: 'admin',
    createdOn: '2020-06-16',
    person: {
      id: 2,
      name: 'Administrator',
      idCard: '',
    },
    role: 'Administrator'
  }
];
