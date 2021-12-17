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
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { ProductCategory } from 'src/models/entities/ProductCategory';

@Injectable()
export class ProductCategoryTreeService
  implements OnDestroy {

  private categoriesSource = new BehaviorSubject<ProductCategory[]>([]);
  private loadingSubscription: Subscription | undefined;

  categories$ = this.categoriesSource.asObservable();

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataProductCategories) private apiService: ITransactionalEntityDataApiService<ProductCategory>
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

  addNode(child: ProductCategory, parent?: ProductCategory) {
    const target: ProductCategory = {
      code: child.code,
      name: child.name
    };
    if (parent?.code) { target.parent = { code: parent.code }; }
    return this.apiService.create(target).pipe(
      tap(() => {
        if (!parent.children) {
          parent.children = [target];
        } else {
          parent.children.push(target);
        }
        this.categoriesSource.next(this.categoriesSource.value);
      })
    );
  }

  editNode(originalNode: ProductCategory, newNode: ProductCategory) {
    return this.apiService.update(originalNode, newNode).pipe(
      tap(() => {
        originalNode.code = newNode.code;
        originalNode.name = newNode.name;
        originalNode.parent = newNode.parent;
        this.categoriesSource.next(this.categoriesSource.value);
      })
    );
  }

  deleteNode(node: ProductCategory) {
    return this.apiService.delete({ code: node.code }).pipe(
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

  private loadChildrenOf(parent: ProductCategory): Observable<ProductCategory[]> {
    return this.apiService.fetchPageFilteredBy({ parentCode: parent.code }).pipe(
      map(page => page.items as ProductCategory[]),
      tap(items => (parent.children = items))
    );
  }

}
