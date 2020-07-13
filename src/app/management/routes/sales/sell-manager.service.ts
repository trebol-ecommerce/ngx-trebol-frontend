import { Inject, Injectable } from '@angular/core';
import { Sell } from 'src/data/models/entities/Sell';
import { SellDetail } from 'src/data/models/entities/SellDetail';
import { CompositeEntityDataIService } from 'src/data/services/composite-entity.data.iservice';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { DataManagerAbstractService } from '../../data-manager.abstract-service';

@Injectable()
export class SellManagerService
  extends DataManagerAbstractService<Sell> {

  constructor(
    @Inject(DATA_INJECTION_TOKENS.sales) protected dataService: CompositeEntityDataIService<Sell, SellDetail>
  ) {
    super();
  }
}
