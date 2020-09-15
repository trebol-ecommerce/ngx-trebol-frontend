import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export abstract class HttpService {

  // protected webServiceProviderHostName: string = "localhost";
  // protected webServiceProviderHostPort: number = 8082;
  // protected baseURI: string = "http://"+this.webServiceProviderHostName+":"+String(this.webServiceProviderHostPort)+"/api";
  protected baseURI = environment.baseURI;

  /**
   * Syntactic sugar - create wrapped httpParams object - use directly as argument in http request
   */
  protected httpParamsOf(object: any): { params: HttpParams } {
    return {
      params: new HttpParams({ fromObject: object })
    };
  }

  constructor() {}
}
