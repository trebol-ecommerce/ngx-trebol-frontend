import { Inject, Injectable } from '@angular/core';
import { Sell } from 'src/data/models/entities/Sell';
import { SellDetail } from 'src/data/models/entities/SellDetail';
import { CompositeEntityDataIService } from 'src/data/services/composite-entity.data.iservice';
import { DATA_INJECTION_TOKENS } from 'src/data/data-injection-tokens';
import { DataManagerService } from '../../data-manager.aservice';

@Injectable()
export class SellManagerService
  extends DataManagerService<Sell> {

  constructor(
    @Inject(DATA_INJECTION_TOKENS.sales) protected dataService: CompositeEntityDataIService<Sell, SellDetail>
  ) {
    super();
  }
}
