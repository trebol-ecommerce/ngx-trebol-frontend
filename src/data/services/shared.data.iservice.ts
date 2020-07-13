import { Observable } from 'rxjs';
import { EmployeeRole } from 'src/data/models/entities/EmployeeRole';
import { ProductFamily } from 'src/data/models/entities/ProductFamily';
import { ProductType } from 'src/data/models/entities/ProductType';
import { PurchaseOrderType } from '../models/entities/PurchaseOrderType';
import { SellType } from '../models/entities/SellType';

export interface SharedDataIService {

  readAllEmployeeRoles(): Observable<EmployeeRole[]>;
  readAllProductFamilies(): Observable<ProductFamily[]>;
  readAllProductTypes(): Observable<ProductType[]>;
  readAllProductTypesByFamilyId(familyId: number): Observable<ProductType[]>;
  readAllSellTypes(): Observable<SellType[]>;
  readAllPurchaseOrderTypes(): Observable<PurchaseOrderType[]>;
}
