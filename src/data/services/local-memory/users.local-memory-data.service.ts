import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeeRolesEnum } from 'src/data/enums/EmployeeRolesEnum';
import { User } from 'src/data/models/entities/User';
import { EntityLocalMemoryDataService } from './local-memory-data.abstract-service';

export const MOCK_USERS: Partial<User>[] = [
  {
    id: 1,
    name: 'admin',
    password: 'admin',
    createdOn: '2020-06-16',
    person: {
      id: 2,
      name: 'Administrador',
      idCard: '',
    },
    employee: {
      id: 1,
      role: { id: EmployeeRolesEnum.Administrador }
    },
    clientId: 1
  }
];

@Injectable()
export class UsersLocalMemoryDataService
  extends EntityLocalMemoryDataService<User> {

  protected items: User[] = MOCK_USERS.map(n => Object.assign(new User(), n));

  constructor() {
    super();
  }

  public create(usuario: User): Observable<User> {
    return super.create(usuario).pipe(
      map(
        u => Object.assign(new User(),
          {
            id: u.id,
            nombre: u.name,
            fechaCreacion: u.createdOn,
            persona: u.person,
            empleado: u.employee,
            idCliente: u.clientId
          })
      )
    );
  }
}
