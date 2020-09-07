import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { User } from 'src/data/models/entities/User';
import { HttpService } from 'src/data/services/http/http.abstract-service';
import { EntityDataIService } from '../entity.data.iservice';

@Injectable()
export class UsersHttpDataService
  extends HttpService
  implements EntityDataIService<User> {

  protected baseURI = this.baseURI + '/gestion/usuarios';

  constructor(
    protected http: HttpClient
  ) {
    super();
  }
  readById(id: string | number): Observable<User> {
    throw new Error('Method not implemented.');
  }
  readFiltered(f: any): Observable<User[]> {
    throw new Error('Method not implemented.');
  }
  update(emp: User, id: string | number): Observable<number> {
    throw new Error('Method not implemented.');
  }

  public readAll(): Observable<User[]> {
    return this.http.get<User[]>(
      this.baseURI
    ).pipe(
      retry(2)
    );
  }

  public create(usr: User): Observable<number> {
    return this.http.post<number>(
      this.baseURI + '/guardar',
      usr
    );
  }

  public deleteById(idUsuario: number): Observable<boolean> {
    return this.http.post<boolean>(
      this.baseURI + '/borrar',
      idUsuario
    );
  }
}
