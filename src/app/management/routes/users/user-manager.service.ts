import { Inject, Injectable } from '@angular/core';
import { User } from 'src/data/models/entities/User';
import { DATA_INJECTION_TOKENS } from 'src/data/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';
import { DataManagerService } from '../data-manager.aservice';

@Injectable()
export class UserManagerService
  extends DataManagerService<User> {

  constructor(
    @Inject(DATA_INJECTION_TOKENS.users) protected dataService: EntityDataIService<User>
  ) {
    super();
  }
}
