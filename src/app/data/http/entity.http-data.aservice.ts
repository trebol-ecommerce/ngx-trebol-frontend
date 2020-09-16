import { HttpService } from 'src/app/shared/http.abstract-service';
import { environment } from 'src/environments/environment';

export abstract class EntityHttpDataService
  extends HttpService {

  protected baseURI = `${environment.baseURI}/api`;
}
