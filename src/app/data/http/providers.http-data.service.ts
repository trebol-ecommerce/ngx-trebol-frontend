import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Provider } from 'src/app/data/models/entities/Provider';
import { EntityDataIService } from '../entity.data.iservice';
import { EntityHttpDataService } from './entity.http-data.aservice';

@Injectable()
export class ProvidersHttpDataService
  extends EntityHttpDataService
  implements EntityDataIService<Provider> {

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  public create(provider: Provider): Observable<number> {
    return this.http.post<number>(
      `${this.baseURI}/provider`,
      provider
    );
  }

  public readById(id: number): Observable<Provider> {
    return this.http.get<Provider>(
      `${this.baseURI}/provider/${id}`
    );
  }

  public readAll(): Observable<Provider[]> {
    return this.http.get<Provider[]>(
      `${this.baseURI}/providers`
    );
  }

  public readFiltered(filters: any): Observable<Provider[]> {
    return this.http.get<Provider[]>(
      `${this.baseURI}/providers`,
      this.httpParamsOf(filters)
    );
  }

  public update(provider: Provider, id: string | number): Observable<number> {
    return this.http.put<number>(
      `${this.baseURI}/provider/${id}`,
      provider
    );
  }

  public deleteById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.baseURI}/provider/${id}`
    );
  }
}
