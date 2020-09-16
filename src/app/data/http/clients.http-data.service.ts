import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/data/models/entities/Client';
import { HttpService } from 'src/app/shared/http.abstract-service';
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
      `${this.baseURI}/client`,
      client
    );
  }

  public readById(id: number): Observable<Client> {
    return this.http.get<Client>(
      `${this.baseURI}/client/${id}`
    );
  }

  public readAll(): Observable<Client[]> {
    return this.http.get<Client[]>(
      `${this.baseURI}/clients`
    );
  }

  public readFiltered(filters: any): Observable<Client[]> {
    return this.http.get<Client[]>(
      `${this.baseURI}/clients`,
      this.httpParamsOf(filters)
    );
  }

  public update(client: Client, id: number): Observable<number> {
    return this.http.put<number>(
      `${this.baseURI}/client/${id}`,
      client
    );
  }

  public deleteById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.baseURI}/client/${id}`
    );
  }
}
