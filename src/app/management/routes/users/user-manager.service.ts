import { Inject, Injectable } from '@angular/core';
import { User } from 'src/data/models/entities/User';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';
import { DataManagerAbstractService } from '../../data-manager.abstract-service';

@Injectable()
export class UserManagerService
  extends DataManagerAbstractService<User> {

  constructor(
    @Inject(DATA_INJECTION_TOKENS.users) protected dataService: EntityDataIService<User>
  ) {
    super();
  }
}
