import { NgModule } from '@angular/core';
import { AUTH_INJECTION_TOKEN } from '../auth.injection-token';
import { HttpAuthService } from './http-auth.service';

@NgModule({
  providers: [
    { provide: AUTH_INJECTION_TOKEN, useClass: HttpAuthService }
  ]
})
export class HttpAuthModule { }
