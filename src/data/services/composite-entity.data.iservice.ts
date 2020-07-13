import { Observable } from 'rxjs';
import { EntityDataIService } from './entity.data.iservice';

export interface CompositeEntityDataIService<T, X>
  extends EntityDataIService<T> {

  readDetailsById(id: number): Observable<X[]>;
}
