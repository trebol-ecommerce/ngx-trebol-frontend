import { Observable } from 'rxjs';
import { EntityCrudIService } from './entity.crud.iservice';
import { AbstractEntity } from './models/AbstractEntity';

export interface CompositeEntityCrudIService<T extends AbstractEntity, X extends AbstractEntity>
  extends EntityCrudIService<T> {

  readDetailsById(id: number): Observable<X[]>;
}
