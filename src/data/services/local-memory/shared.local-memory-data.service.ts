import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CompanyDetails } from 'src/data/models/CompanyDetails';
import { EmployeeRole } from 'src/data/models/entities/EmployeeRole';
import { ProductFamily } from 'src/data/models/entities/ProductFamily';
import { ProductType } from 'src/data/models/entities/ProductType';
import { PurchaseOrderType } from 'src/data/models/entities/PurchaseOrderType';
import { SellType } from 'src/data/models/entities/SellType';
import { SharedDataIService } from '../shared.data.iservice';

export const MOCK_COMPANY_DETAILS: CompanyDetails = {
  name: 'Nombre de la compañía',
  description: 'Descripción de la compañía',
  bannerImageURL: 'assets/img/banner.png',
  logoImageURL: 'assets/img/logo.png'
};

export const MOCK_EMPLOYEE_ROLES: Partial<EmployeeRole>[] = [
  { id: 1, name: 'Administrador' }
];

export const MOCK_PRODUCT_FAMILIES: Partial<ProductFamily>[] = [
  { id: 1, name: 'Ropa y Calzado', provider: { id: 1, businessCard: 'aksdnao' } }
];

export const MOCK_PRODUCT_TYPES: Partial<ProductType>[] = [
  { id: 1, name: 'Zapatillas Hombre', productFamily: { id: 1 } }
];

export const MOCK_SELL_TYPES: SellType[] = [
  { id: 'B', description: 'Boleta' },
  { id: 'F', description: 'Factura' }
];

export const MOCK_PURCHASE_ORDER_TYPES: PurchaseOrderType[] = [
  { id: 'B', description: 'Boleta' },
  { id: 'F', description: 'Factura' }
];

@Injectable()
export class SharedLocalMemoryDataService
  implements SharedDataIService {

  public readCompanyDetails(): Observable<CompanyDetails> {
    return of(MOCK_COMPANY_DETAILS);
  }

  public readAllEmployeeRoles(): Observable<EmployeeRole[]> {
    return of(MOCK_EMPLOYEE_ROLES.map(r => Object.assign(new EmployeeRole(), r)));
  }

  public readAllProductFamilies(): Observable<ProductFamily[]> {
    return of(MOCK_PRODUCT_FAMILIES.map(f => Object.assign(new ProductFamily(), f)));
  }

  public readAllProductTypes(): Observable<ProductType[]> {
    return of(MOCK_PRODUCT_TYPES.map(t => Object.assign(new ProductType(), t)));
  }

  public readAllProductTypesByFamilyId(familyId: number): Observable<ProductType[]> {
    return of(MOCK_PRODUCT_TYPES.filter(t => t.productFamily.id === familyId)
      .map(t => Object.assign(new ProductType(), t))
    );
  }

  public readAllSellTypes(): Observable<SellType[]> {
    return of(MOCK_SELL_TYPES.map(t => Object.assign(new SellType(), t)));
  }

  public readAllPurchaseOrderTypes(): Observable<PurchaseOrderType[]> {
    return of(MOCK_PURCHASE_ORDER_TYPES.map(t => Object.assign(new PurchaseOrderType(), t)));
  }
}
