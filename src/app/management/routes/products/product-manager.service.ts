import { Inject, Injectable } from '@angular/core';
import { Product } from 'src/app/data/models/entities/Product';
import { DATA_INJECTION_TOKENS } from 'src/app/data/data-injection-tokens';
import { EntityDataIService } from 'src/app/data/services/entity.data.iservice';
import { DataManagerService } from '../data-manager.aservice';

@Injectable()
export class ProductManagerService
  extends DataManagerService<Product> {

  constructor(
    @Inject(DATA_INJECTION_TOKENS.products) protected dataService: EntityDataIService<Product>
  ) {
    super();
  }
}
