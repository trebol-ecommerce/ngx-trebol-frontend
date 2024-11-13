/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { InjectionToken } from "@angular/core";
import { BillingType } from "src/models/entities/BillingType";
import { Image } from "src/models/entities/Image";
import { Person } from "src/models/entities/Person";
import { Product } from "src/models/entities/Product";
import { ProductCategory } from "src/models/entities/ProductCategory";
import { ProductList } from "src/models/entities/ProductList";
import { Sell } from "src/models/entities/Sell";
import { Shipper } from "src/models/entities/Shipper";
import { User } from "src/models/entities/User";
import { UserRole } from "src/models/entities/UserRole";
import { IAboutPublicApiService } from "./about-public-api.iservice";
import { IAccessApiService } from "./access-api.iservice";
import { ICheckoutPublicApiService } from "./checkout-public-api.iservice";
import { IEntityDataApiService } from "./entity.data-api.iservice";
import { IGuestPublicApiService } from "./guest-public-api.iservice";
import { ILoginPublicApiService } from "./login-public-api.iservice";
import { IProfileAccountApiService } from "./profile-account-api.iservice";
import { IReceiptPublicApiService } from "./receipt-public-api.iservice";
import { IRegisterPublicApiService } from "./register-public-api.iservice";
import { ITransactionalEntityDataApiService } from "./transactional-entity.data-api.iservice";

/**
 * Service tokens for Angular dependency injection pattern
 */
export const API_INJECTION_TOKENS = {
  access: new InjectionToken<IAccessApiService>('Trebol.IAccessApi'),
  accountProfile: new InjectionToken<IProfileAccountApiService>('Trebol.IProfileAccountApi'),
  dataBillingTypes: new InjectionToken<IEntityDataApiService<BillingType>>('Trebol.IEntityDataApi<BillingType>'),
  dataCustomers: new InjectionToken<ITransactionalEntityDataApiService<Person>>('Trebol.ITransactionalEntityDataApiService<Customer>'),
  dataImages: new InjectionToken<ITransactionalEntityDataApiService<Image>>('Trebol.ITransactionalEntityDataApiService<Image>'),
  dataPeople: new InjectionToken<IEntityDataApiService<Person>>('Trebol.IEntityDataApi<Person>'),
  dataProductCategories: new InjectionToken<ITransactionalEntityDataApiService<ProductCategory>>('Trebol.ITransactionalEntityDataApiService<ProductCategory>'),
  dataProductLists: new InjectionToken<ITransactionalEntityDataApiService<ProductList>>('Trebol.ITransactionalEntityDataApiService<ProductList>'),
  dataProducts: new InjectionToken<ITransactionalEntityDataApiService<Product>>('Trebol.ITransactionalEntityDataApiService<Product>'),
  dataSales: new InjectionToken<ITransactionalEntityDataApiService<Sell>>('Trebol.ITransactionalEntityDataApiService<Sell>'),
  dataSalespeople: new InjectionToken<ITransactionalEntityDataApiService<Person>>('Trebol.ITransactionalEntityDataApiService<Salesperson>'),
  dataShippers: new InjectionToken<ITransactionalEntityDataApiService<Shipper>>('Trebol.ITransactionalEntityDataApiService<Shipper>'),
  dataUserRoles: new InjectionToken<IEntityDataApiService<UserRole>>('Trebol.IEntityDataApi<UserRole>'),
  dataUsers: new InjectionToken<ITransactionalEntityDataApiService<User>>('Trebol.ITransactionalEntityDataApiService<User>'),
  about: new InjectionToken<IAboutPublicApiService>('Trebol.IAboutPublicApi'),
  checkout: new InjectionToken<ICheckoutPublicApiService>('Trebol.ICheckoutPublicApi'),
  guest: new InjectionToken<IGuestPublicApiService>('Trebol.IGuestPublicApi'),
  login: new InjectionToken<ILoginPublicApiService>('Trebol.ILoginPublicApi'),
  receipt: new InjectionToken<IReceiptPublicApiService>('Trebol.IReceiptPublicApi'),
  register: new InjectionToken<IRegisterPublicApiService>('Trebol.IRegisterPublicApi')
};
