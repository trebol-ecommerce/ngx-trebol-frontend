import { Injectable, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductFamily } from 'src/data/models/entities/ProductFamily';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { SharedDataIService } from 'src/data/services/shared.data.iservice';
import { ProductType } from 'src/data/models/entities/ProductType';

@Injectable({
  providedIn: 'root'
})
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
