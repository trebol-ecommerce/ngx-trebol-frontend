import { Observable } from 'rxjs';
import { ProductFamily } from 'src/app/data/models/entities/ProductFamily';
import { ProductType } from 'src/app/data/models/entities/ProductType';
import { CompanyDetails } from './models/CompanyDetails';
import { PurchaseOrderType } from './models/entities/PurchaseOrderType';
import { SellType } from './models/entities/SellType';

export interface SharedDataIService {

  readCompanyDetails(): Observable<CompanyDetails>;
  readAllProductFamilies(): Observable<ProductFamily[]>;
  readAllProductTypes(): Observable<ProductType[]>;
  readAllProductTypesByFamilyId(familyId: number): Observable<ProductType[]>;
  readAllSellTypes(): Observable<SellType[]>;
  readAllPurchaseOrderTypes(): Observable<PurchaseOrderType[]>;
}
