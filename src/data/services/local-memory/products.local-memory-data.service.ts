import { Injectable } from '@angular/core';
import { ProductFilters } from 'src/app/shared/product-filters-panel/product-filters-panel.component';
import { Product } from 'src/data/models/entities/Product';
import { EntityLocalMemoryDataService } from './entity.local-memory-data.aservice';

export const MOCK_PRODUCTS: Partial<Product>[] = [
  {
    id: 1,
    name: 'Zapatillas Nike Air Jordan Azul/Negro',
    barcode: 'NIKE-AZLNGR-1',
    price: 14990,
    currentStock: 40,
    criticalStock: 5,
    productType: {
      id: 1,
      description: 'Zapatillas Hombre',
      productFamily: { id: 1 }
    },
    imagesURL: [ 'assets/img/products/photo-1578116922645-3976907a7671.jpg' ]
  },
  {
    id: 2,
    name: 'Zapatillas Nike Hi-Top Rojo/Negro',
    barcode: 'NIKE-ROJNGR-1',
    price: 14990,
    currentStock: 20,
    criticalStock: 5,
    productType: {
      id: 1,
      description: 'Zapatillas Hombre',
      productFamily: { id: 1 }
    },
    imagesURL: [ 'assets/img/products/photo-1578172433613-9f1b258f7d5b.jpg' ]
  },
  {
    id: 3,
    name: 'Zapatillas Nike Hi-Top Rojo/Blanco',
    barcode: 'NIKE-ROJBCO-1',
    price: 13990,
    currentStock: 60,
    criticalStock: 5,
    productType: {
      id: 1,
      description: 'Zapatillas Hombre',
      productFamily: { id: 1 }
    },
    imagesURL: [ 'assets/img/products/photo-1580143881495-b21dde95fc60.jpg' ]
  }
];

@Injectable()
export class ProductsLocalMemoryDataService
  extends EntityLocalMemoryDataService<Product> {

  protected items: Product[] = MOCK_PRODUCTS.map(n => Object.assign(new Product(), n));

  constructor() {
    super();
  }

  protected filterItems(filter: ProductFilters): Product[] {
    let matchingItems = this.items;
    if (filter.name) {
      matchingItems = matchingItems.filter(
        it => it.name.toUpperCase().includes(filter.name.toUpperCase())
      );
    }
    if (filter.familyId) {
      matchingItems = matchingItems.filter(
        it => it.productType.productFamily.id === filter.familyId
      );
    }
    if (filter.typeId) {
      matchingItems = matchingItems.filter(
        it => it.productType.id === filter.typeId
      );
    }

    return matchingItems;
  }
}
