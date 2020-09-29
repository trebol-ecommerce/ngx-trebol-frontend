import { Inject, Injectable } from '@angular/core';
import { Seller } from 'src/app/data/models/entities/Seller';
import { DATA_INJECTION_TOKENS } from 'src/app/data/data-injection-tokens';
import { EntityCrudIService } from 'src/app/data/entity.crud.iservice';
import { DataManagerService } from '../data-manager.aservice';

@Injectable()
export class SellerManagerService
  extends DataManagerService<Seller> {

  constructor(
    @Inject(DATA_INJECTION_TOKENS.sellers) protected dataService: EntityCrudIService<Seller>
  ) {
    super();
  }
}
