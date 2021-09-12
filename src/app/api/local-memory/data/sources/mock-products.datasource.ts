import { Product } from 'src/app/models/entities/Product';

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
    images: [
      {
        filename: 'photo-1578116922645-3976907a7671.jpg',
        url: 'assets/img/products/photo-1578116922645-3976907a7671.jpg',
        id: 'assets/img/products/photo-1578116922645-3976907a7671.jpg'
      }
    ]
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
    images: [
      {
        filename: 'photo-1578172433613-9f1b258f7d5b.jpg',
        url: 'assets/img/products/photo-1578172433613-9f1b258f7d5b.jpg',
        id: 'assets/img/products/photo-1578172433613-9f1b258f7d5b.jpg'
      }
    ]
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
    images: [
      {
        filename: 'photo-1580143881495-b21dde95fc60.jpg',
        url: 'assets/img/products/photo-1580143881495-b21dde95fc60.jpg',
        id: 'assets/img/products/photo-1580143881495-b21dde95fc60.jpg'
      }
    ]
  }
];
