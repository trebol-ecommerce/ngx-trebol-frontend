import { Injectable } from '@angular/core';
import { HttpService } from 'src/data/services/http/http.abstract-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Provider } from 'src/data/models/entities/Provider';
import { retry, map } from 'rxjs/operators';
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
  update(emp: Provider, id: string | number): Observable<Provider> {
    throw new Error('Method not implemented.');
  }

  public readAll(): Observable<Provider[]> {
    return this.http.get<Provider[]>(
      this.baseURI
    ).pipe(
      retry(2)
    );
  }

  public create(prov: Provider): Observable<Provider> {
    return this.http.post<number>(
      this.baseURI + '/guardar',
      prov
    ).pipe(
      map(id => {
        prov.id = id;
        return prov;
      })
    );
  }

  public deleteById(idProveedor: number): Observable<boolean> {
    return this.http.post<boolean>(
      this.baseURI + '/borrar',
      idProveedor
    );
  }
}
