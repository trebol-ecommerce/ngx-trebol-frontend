import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { EmployeeRole } from 'src/data/models/entities/EmployeeRole';
import { ProductFamily } from 'src/data/models/entities/ProductFamily';
import { Person } from 'src/data/models/entities/Person';
import { ProductType } from 'src/data/models/entities/ProductType';
import { SharedDataIService } from '../shared.data.iservice';
import { HttpService } from './http.abstract-service';

@Injectable()
export class SharedHttpDataService
  extends HttpService
  implements SharedDataIService {

  protected baseURI: string = this.baseURI + '/gestion';

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  public readAllEmployeeRoles(): Observable<EmployeeRole[]> {
    return this.http.get<EmployeeRole[]>(
      this.baseURI + '/cargos'
    ).pipe(
      retry(2)
    );
  }

  public readAllPersonas(): Observable<Person[]> {
    return this.http.get<Person[]>(
      this.baseURI + '/personas'
    ).pipe(
      retry(2)
    );
  }

  public readAllProductFamilies(): Observable<ProductFamily[]> {
    return this.http.get<ProductFamily[]>(
      this.baseURI + '/familias_producto'
    ).pipe(
      retry(2)
    );
  }

  public readAllProductTypes(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(
      this.baseURI + '/tipos_producto'
    ).pipe(
      retry(2)
    );
  }

  public readAllProductTypesByFamilyId(familyId: number): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(
      this.baseURI + '/tipos_producto',
      this.parametrosHttp({
        familia: String(familyId)
      })
    ).pipe(
      retry(2)
    );
  }
}
