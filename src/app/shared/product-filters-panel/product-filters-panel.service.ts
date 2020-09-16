import { Injectable, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductFamily } from 'src/app/data/models/entities/ProductFamily';
import { DATA_INJECTION_TOKENS } from 'src/app/data/data-injection-tokens';
import { SharedDataIService } from 'src/app/data/shared.data.iservice';
import { ProductType } from 'src/app/data/models/entities/ProductType';

@Injectable({ providedIn: 'root' })
export class ProductFiltersPanelService {

  constructor(
    @Inject(DATA_INJECTION_TOKENS.shared) protected sharedDataService: SharedDataIService,
  ) { }

  public getAllProductFamilies(): Observable<ProductFamily[]> {
    return this.sharedDataService.readAllProductFamilies();
  }

  public getProductTypesFromFamilyId(id: number): Observable<ProductType[]> {
    return this.sharedDataService.readAllProductTypesByFamilyId(id);
  }

}
