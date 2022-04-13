/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, from, of } from 'rxjs';
import { expand, ignoreElements, map, switchMap, tap, toArray } from 'rxjs/operators';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { ProductCategoryTreeFlatNode } from './ProductCategoryTreeFlatNode';

@Injectable({ providedIn: 'root' })
export class ProductCategoryTreeService {

  private flatNodeMap = new Map<ProductCategoryTreeFlatNode, ProductCategory>();
  private nestedNodeMap = new Map<ProductCategory, ProductCategoryTreeFlatNode>();
  private categoriesSource = new BehaviorSubject<ProductCategory[]>([]);

  categories$ = this.categoriesSource.asObservable();

  constructor(
    @Inject(API_INJECTION_TOKENS.dataProductCategories) public apiService: ITransactionalEntityDataApiService<ProductCategory>
  ) { }

  reloadCategories(force = false) {
    if (force || !this.categoriesSource.value.length) {
      this.apiService.fetchPage().pipe(
        switchMap(page => from(page.items)),
        expand(category => this.loadChildren(category).pipe(
          switchMap(children => from(children)),
          ignoreElements()
        )),
        toArray(),
        tap(c => this.categoriesSource.next(c))
      ).subscribe();
    }
  }

  addNode(newNode: ProductCategory) {
    return this.apiService.create(newNode).pipe(
      tap(() => {
        const parent = newNode.parent;
        if (parent) {
          if (parent.children) {
            parent.children = [newNode];
          } else {
            parent.children.push(newNode);
          }
        }
        this.categoriesSource.next(this.categoriesSource.value);
      }),
      map(() => newNode)
    );
  }

  editNode(newNode: ProductCategory, originalNode: ProductCategory) {
    return this.apiService.update(newNode, originalNode).pipe(
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
        this.categoriesSource.next(rootCategories);
      })
    );
  }

  transformNode(node: ProductCategory, level: number) {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = (existingNode) ? existingNode : new ProductCategoryTreeFlatNode();
    flatNode.name = node.name;
    flatNode.level = level;
    flatNode.expandable = !!(node.children?.length);
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  fetchCategoryFromNode(treeNode: ProductCategoryTreeFlatNode) {
    return of(this.flatNodeMap.get(treeNode));
  }

  private loadChildren(parent: ProductCategory) {
    return this.apiService.fetchPage(0, Number.MAX_SAFE_INTEGER, null, null, { parentCode: parent.code }).pipe(
      map(page => page.items as ProductCategory[]),
      tap(children => { parent.children = children; })
    );
  }

}
