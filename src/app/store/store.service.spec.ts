// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LocalMemoryDataModule } from 'src/app/api/data-mgt/local-memory/local-memory-data-api.module';
import { StoreService } from './store.service';
import { Product } from 'src/app/models/entities/Product';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { take } from 'rxjs/operators';

describe('StoreService', () => {
  let service: StoreService;
  const mockProduct: Product = { id: 1, barcode: 'example', name: 'test product', price: 500, productType: { id: 1 } };
  const mockProductTwo: Product = { id: 2, barcode: 'example2', name: 'test product two', price: 1000, productType: { id: 1 } };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LocalMemoryDataModule,
        HttpClientTestingModule
      ],
      providers: [
        StoreService
      ]
    });
    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store items in the cart', () => {
    service.addProductToCart(mockProduct);
    service.addProductToCart(mockProductTwo);
    service.cartDetails$.pipe(take(1)).subscribe(
      (sellDetails: SellDetail[]) => {
        expect(sellDetails.length).toBe(2);
        expect(sellDetails[0].product).toEqual(mockProduct);
        expect(sellDetails[0].units).toBe(1);
        expect(sellDetails[1].product).toEqual(mockProductTwo);
        expect(sellDetails[1].units).toBe(1);
      }
    );
  });

  it('should delete items from the cart', () => {
    service.addProductToCart(mockProduct);
    service.addProductToCart(mockProductTwo);
    service.removeProductFromCart(1);
    service.cartDetails$.pipe(take(1)).subscribe(
      (sellDetails: SellDetail[]) => {
        expect(sellDetails.length).toBe(1);
        expect(sellDetails[0].product).toEqual(mockProduct);
      }
    );

    service.addProductToCart(mockProduct);
    service.reset();
    service.cartDetails$.pipe(take(1)).subscribe(
      (sellDetails: SellDetail[]) => {
        expect(sellDetails.length).toBe(0);
      }
    );
  });

  it('should increase and decrease units of an individual item in the cart', () => {
    service.addProductToCart(mockProduct);
    service.addProductToCart(mockProductTwo);
    service.increaseProductUnits(1);
    service.increaseProductUnits(1);
    service.cartDetails$.pipe(take(1)).subscribe(
      (sellDetails: SellDetail[]) => {
        expect(sellDetails[1].units).toBe(3);
      }
    );

    service.decreaseProductUnits(1);
    service.cartDetails$.pipe(take(1)).subscribe(
      (sellDetails: SellDetail[]) => {
        expect(sellDetails[1].units).toBe(2);
      }
    );
  });

  it('should update items quantity as the items in the cart vary', () => {
    let cartItemCount: number;
    let sub = service.cartItemCount$.subscribe(q => { cartItemCount = q; });
    expect(cartItemCount).toBe(0);
    service.addProductToCart(mockProduct);
    expect(cartItemCount).toBe(1);
    service.addProductToCart(mockProductTwo);
    expect(cartItemCount).toBe(2);
    service.increaseProductUnits(0);
    service.increaseProductUnits(0);
    service.increaseProductUnits(1);
    expect(cartItemCount).toBe(5);
    service.removeProductFromCart(1);
    expect(cartItemCount).toBe(3);
    service.decreaseProductUnits(0);
    service.decreaseProductUnits(0);
    expect(cartItemCount).toBe(1);
    service.reset();
    expect(cartItemCount).toBe(0);
    sub.unsubscribe();
  });

  it('should not store items with duplicate ids, but increase the current quantity', () => {
    service.addProductToCart(mockProduct);
    service.addProductToCart(mockProduct);
    service.cartDetails$.pipe(take(1)).subscribe(
      (sellDetails: SellDetail[]) => {
        expect(sellDetails.length).toBe(1);
        expect(sellDetails[0].product).toEqual(mockProduct);
        expect(sellDetails[0].units).toBe(2);
      }
    );
  });

  it('should checkout the cart', () => {
    service.submitCart().subscribe(
      redirectionData => {
        expect(redirectionData).toBeTruthy();
      }
    );
  });

});
