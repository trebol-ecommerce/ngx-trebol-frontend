import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Provider } from 'src/data/models/entities/Provider';
import { HttpService } from 'src/data/services/http/http.abstract-service';
import { EntityDataIService } from '../entity.data.iservice';

@Injectable()
export class ProvidersHttpDataService
  extends HttpService
  implements EntityDataIService<Provider> {

  protected baseURI = this.baseURI + '/gestion/proveedores';

  constructor(
    protected http: HttpClient
  ) {
    super();
  }
  readById(id: string | number): Observable<Provider> {
    throw new Error('Method not implemented.');
  }
  readFiltered(f: any): Observable<Provider[]> {
    throw new Error('Method not implemented.');
  }
  update(emp: Provider, id: string | number): Observable<number> {
    throw new Error('Method not implemented.');
  }

  public readAll(): Observable<Provider[]> {
    return this.http.get<Provider[]>(
      this.baseURI
    ).pipe(
      retry(2)
    );
  }

  public create(prov: Provider): Observable<number> {
    return this.http.post<number>(
      this.baseURI + '/guardar',
      prov
    );
  }

  public deleteById(idProveedor: number): Observable<boolean> {
    return this.http.post<boolean>(
      this.baseURI + '/borrar',
      idProveedor
    );
  }
}
