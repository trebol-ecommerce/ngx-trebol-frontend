/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Observable } from "rxjs";
import { DataPage } from "src/models/DataPage";
import { Product } from "src/models/entities/Product";
import { ProductList } from "src/models/entities/ProductList";
import { ITransactionalEntityDataApiService } from "./transactional-entity.data-api.iservice";

export interface ITransactionalProductListContentsDataApiService
  extends ITransactionalEntityDataApiService<ProductList> {

  /**
   * Get a paginated collection of products from a source list
   * @param list The list of products to fetch contents from
   */
  fetchContents(list: ProductList, pageIndex?: number, pageSize?: number, sortBy?: string, order?: string): Observable<DataPage<Product>>;

  /**
   * Add products to a list
   * @param list The list of products to add to
   * @param productLike A product to be added
   */
  addToContents(list: ProductList, productLike: Partial<Product>): Observable<any>;

  /**
   * Remove one or all products from a list
   * @param list The affected list of products
   * @param productLike The specific product to be removed. If not provided, all products must be removed.
   */
  deleteFromContents(list: ProductList, productLike?: Partial<Product>): Observable<any>;

  /**
   * Update all products contained in a list (remove all, then insert provided ones)
   * @param list The list of products to update
   * @param products A collection of products to be added
   */
  updateContents(list: ProductList, products: Partial<Product>[]): Observable<any>;
}
