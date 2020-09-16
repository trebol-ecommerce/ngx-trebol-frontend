import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AUTH_INJECTION_TOKEN } from '../auth.injection-token';
import { HttpAuthService } from './http-auth.service';
import { HttpAuthInterceptor } from './http-auth.interceptor';

@NgModule({
  providers: [
    { provide: AUTH_INJECTION_TOKEN, useClass: HttpAuthService },
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true }
  ]
})
export class HttpAuthModule { }
