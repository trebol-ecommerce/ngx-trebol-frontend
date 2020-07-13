import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export abstract class HttpService {

  // protected webServiceProviderHostName: string = "localhost";
  // protected webServiceProviderHostPort: number = 8082;
  // protected baseURI: string = "http://"+this.webServiceProviderHostName+":"+String(this.webServiceProviderHostPort)+"/api";
  protected baseURI = environment.baseURI;

  /**
   * Función de azúcar sintáctico: crea objeto con parámetros para un HttpClient a partir de las propiedades del objeto ingresado
   */
  protected parametrosHttp(object: any): { params: HttpParams } {
    return {
      params: new HttpParams({ fromObject: object })
    };
  }

  constructor() {}
}
