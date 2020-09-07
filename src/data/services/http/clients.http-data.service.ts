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
  update(emp: Client, id: string | number): Observable<number> {
    throw new Error('Method not implemented.');
  }

  public readAll(): Observable<Client[]> {
    return this.http.get<Client[]>(
      this.baseURI + '/clients'
    ).pipe(
      retry(2)
    );
  }

  public create(client: Client): Observable<number> {
    return this.http.post<number>(
      this.baseURI + '/client',
      client
    );
  }

  public deleteById(clientId: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.baseURI + `/client/${clientId}`
    );
  }
}
