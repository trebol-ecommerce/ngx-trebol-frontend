import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/data/models/entities/Client';
import { HttpService } from 'src/data/services/http/http.abstract-service';
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

  public create(client: Client): Observable<number> {
    return this.http.post<number>(
      this.baseURI + '/client',
      client
    );
  }

  public readById(clientId: number): Observable<Client> {
    return this.http.get<Client>(
      this.baseURI + `/client/${clientId}`
    );
  }

  public readAll(): Observable<Client[]> {
    return this.http.get<Client[]>(
      this.baseURI + '/clients'
    );
  }

  public readFiltered(filters: any): Observable<Client[]> {
    return this.http.get<Client[]>(
      this.baseURI + '/clients',
      this.httpParamsOf(filters)
    );
  }

  public update(client: Client, clientId: number): Observable<number> {
    return this.http.put<number>(
      this.baseURI + `/client/${clientId}`,
      client
    );
  }

  public deleteById(clientId: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.baseURI + `/client/${clientId}`
    );
  }
}
