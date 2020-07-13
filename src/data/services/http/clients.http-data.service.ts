import { Injectable } from '@angular/core';
import { HttpService } from 'src/data/services/http/http.abstract-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from 'src/data/models/entities/Client';
import { retry, map } from 'rxjs/operators';
import { EntityDataIService } from '../entity.data.iservice';

@Injectable()
export class ClientsHttpDataService
  extends HttpService
  implements EntityDataIService<Client> {

  protected baseURI = this.baseURI + '/gestion/clientes';

  constructor(
    protected http: HttpClient
  ) {
    super();
  }
  readById(id: string | number): Observable<Client> {
    throw new Error('Method not implemented.');
  }
  readFiltered(f: any): Observable<Client[]> {
    throw new Error('Method not implemented.');
  }
  update(emp: Client, id: string | number): Observable<Client> {
    throw new Error('Method not implemented.');
  }

  public readAll(): Observable<Client[]> {
    return this.http.get<Client[]>(
      this.baseURI
    ).pipe(
      retry(2)
    );
  }

  public create(cli: Client): Observable<Client> {
    return this.http.post<number>(
      this.baseURI + '/guardar',
      cli
    ).pipe(
      map(id => {
        cli.id = id;
        return cli;
      })
    );
  }

  public deleteById(idCliente: number): Observable<boolean> {
    return this.http.post<boolean>(
      this.baseURI + '/borrar',
      idCliente
    );
  }
}
