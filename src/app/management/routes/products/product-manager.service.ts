import { Inject, Injectable } from '@angular/core';
import { Product } from 'src/data/models/entities/Product';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';
import { DataManagerAbstractService } from '../../data-manager.abstract-service';

@Injectable()
export class ProductManagerService
  extends DataManagerAbstractService<Product> {

  constructor(
    @Inject(DATA_INJECTION_TOKENS.products) protected dataService: EntityDataIService<Product>
  ) {
    super();
  }
}
