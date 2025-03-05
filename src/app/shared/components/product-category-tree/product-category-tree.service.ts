/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, from, Observable } from 'rxjs';
import { expand, ignoreElements, map, switchMap, tap, toArray } from 'rxjs/operators';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { ProductCategory } from 'src/models/entities/ProductCategory';

@Injectable({ providedIn: 'root' })
export class ProductCategoryTreeService {

  private categoriesSource = new BehaviorSubject<ProductCategory[]>([]);

  categories$ = this.categoriesSource.asObservable();

  constructor(
    @Inject(API_INJECTION_TOKENS.dataProductCategories) public apiService: ITransactionalEntityDataApiService<ProductCategory>
  ) { }

  reloadCategories(force = false): Observable<ProductCategory[]> {
    return (force || !this.categoriesSource.value.length) ?
      this.apiService.fetchPage({
        pageIndex: 0,
        pageSize: 100
      }).pipe(
        switchMap(page => from(page.items)),
        expand(category => this.loadDescendants(category).pipe(
          switchMap(children => from(children)),
          ignoreElements()
        )),
        toArray(),
        tap(c => this.categoriesSource.next(c))
      ) :
      EMPTY;
  }

  add(newNode: ProductCategory) {
    return this.apiService.create(newNode).pipe(
      tap(() => {
        const parent = newNode.parent;
        if (parent) {
          if (parent.children) {
            parent.children = [newNode];
          } else {
            parent.children.push(newNode);
          }
          delete newNode.parent;
        }
        this.categoriesSource.next(this.categoriesSource.value);
      }),
      map(() => newNode)
    );
  }

  edit(newNode: ProductCategory, originalNode: ProductCategory) {
    return this.apiService.update(newNode, originalNode).pipe(
      switchMap(() => this.apiService.fetchExisting(newNode)),
      tap(() => {
        originalNode.code = newNode.code;
        originalNode.name = newNode.name;
        this.categoriesSource.next(this.categoriesSource.value);
      })
    );
  }

  remove(node: ProductCategory) {
    return this.apiService.delete({ code: node.code }).pipe(
      switchMap(() => this.reloadCategories(true))
    );
  }

  private loadDescendants(parent: ProductCategory) {
    return this.apiService.fetchPage({
      pageIndex: 0,
      pageSize: Number.MAX_SAFE_INTEGER,
      filters: { parentCode: parent.code }
    }).pipe(
      map(page => page.items as ProductCategory[]),
      tap(children => { parent.children = children; })
    );
  }

}
