import { Observable } from 'rxjs';
import { EntityDataIService } from './entity.data.iservice';
import { AbstractEntity } from '../models/AbstractEntity';

export interface CompositeEntityDataIService<T extends AbstractEntity, X extends AbstractEntity>
  extends EntityDataIService<T> {

  readDetailsById(id: number): Observable<X[]>;
}
