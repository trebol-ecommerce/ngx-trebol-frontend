import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { CompanyDetails } from 'src/app/data/models/CompanyDetails';
import { Person } from 'src/app/data/models/entities/Person';
import { ProductFamily } from 'src/app/data/models/entities/ProductFamily';
import { ProductType } from 'src/app/data/models/entities/ProductType';
import { SellType } from 'src/app/data/models/entities/SellType';
import { HttpService } from 'src/app/shared/http.abstract-service';
import { SharedDataIService } from '../shared.data.iservice';

@Injectable()
export class SharedHttpDataService
  extends HttpService
  implements SharedDataIService {

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  readCompanyDetails(): Observable<CompanyDetails> {
    throw new Error("Method not implemented.");
  }
  readAllSellTypes(): Observable<SellType[]> {
    throw new Error("Method not implemented.");
  }

  public readAllProductFamilies(): Observable<ProductFamily[]> {
    return this.http.get<ProductFamily[]>(
      `${this.baseURI}/api/product_families`
    ).pipe(
      retry(2)
    );
  }

  public readAllProductTypes(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(
      `${this.baseURI}/api/product_types`
    ).pipe(
      retry(2)
    );
  }

  public readAllProductTypesByFamilyId(familyId: number): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(
      `${this.baseURI}/api/product_types`,
      this.httpParamsOf({ familyId })
    ).pipe(
      retry(2)
    );
  }

  public readAllPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(
      `${this.baseURI}/api/people`
    ).pipe(
      retry(2)
    );
  }
}
