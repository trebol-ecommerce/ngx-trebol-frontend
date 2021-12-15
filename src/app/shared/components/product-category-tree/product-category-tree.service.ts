/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { IProductCategoriesDataApiService } from 'src/app/api/product-categories-data-api.service.interface';
import { ProductCategory } from 'src/app/models/ProductCategory';

@Injectable()
export class ProductCategoryTreeService
  implements OnDestroy {

  private categoriesSource = new BehaviorSubject<ProductCategory[]>([]);
  private loadingSubscription: Subscription | undefined;

  categories$ = this.categoriesSource.asObservable();

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataProductCategories) private apiService: IProductCategoriesDataApiService
  ) { }

  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription?.unsubscribe();
    }
  }

  setRootCategories(categories: ProductCategory[]) {
    this.loadingSubscription?.unsubscribe();
    if (!categories) {
      this.categoriesSource.next([]);
    } else {
      this.loadingSubscription = this.recursivelyLoadChildren(categories).pipe(
        tap(() => this.categoriesSource.next(categories))
      ).subscribe();
    }
  }

  addChildNodeTo(parent: ProductCategory, name: string) {
    return this.apiService.create({
      name,
      parent: { code: parent.code }
    }).pipe(
      map(next => ({ name, code: next } as ProductCategory)),
      tap(newChild => {
        if (!parent.children) {
          parent.children = [newChild];
        } else {
          parent.children.push(newChild);
        }
        this.categoriesSource.next(this.categoriesSource.value);
      })
    );
  }

  editNode(node: ProductCategory, name: string) {
    return this.apiService.update({
      code: node.code,
      name
    }).pipe(
      map(next => ({ name, code: next } as ProductCategory)),
      tap(() => {
        node.name = name;
        this.categoriesSource.next(this.categoriesSource.value);
      })
    );
  }

  deleteNode(node: ProductCategory) {
    return this.apiService.deleteById(node.code).pipe(
      tap(() => {
        const rootCategories = this.categoriesSource.value;
        const nodeIndex = rootCategories.findIndex(n => (n.code === node.code));
        if (nodeIndex !== -1) {
          rootCategories.splice(nodeIndex, 1);
        }
        this.setRootCategories(rootCategories);
      })
    );
  }

  private recursivelyLoadChildren(categories: ProductCategory[]): Observable<any> {
    return forkJoin(categories.map(category => {
      return this.loadChildrenOf(category).pipe(
        switchMap(children => (children.length > 0) ?
          this.recursivelyLoadChildren(children) :
          of(children)
        )
      );
    }));
  }

  private loadChildrenOf(category: ProductCategory): Observable<ProductCategory[]> {
    return this.apiService.readChildrenByParentCategoryCode(category.code).pipe(
      map(page => page.items as ProductCategory[]),
      tap(items => (category.children = items))
    );
  }

}
