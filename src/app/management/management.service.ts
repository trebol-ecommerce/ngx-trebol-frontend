import { Inject, Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, ActivationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, throttleTime } from 'rxjs/operators';
import { AUTH_INJECTION_TOKEN } from 'src/auth/auth.injection-token';
import { AuthenticationIService } from 'src/auth/auth.iservice';

@Injectable()
export class ManagementService
  implements OnDestroy {

  protected isSidenavOpen: boolean = (localStorage.getItem('ngNewBazaar.sidenavOpen') === 'false') ? false : true;
  protected isSidenavOpenSource: Subject<boolean> = new BehaviorSubject(this.isSidenavOpen);

  public isSidenavOpen$: Observable<boolean> = this.isSidenavOpenSource.asObservable();
  public activeRouteSnapshot$: Observable<ActivatedRouteSnapshot>;
  public currentPageName$: Observable<string>;

  constructor(
    @Inject(AUTH_INJECTION_TOKEN) protected authService: AuthenticationIService,
    protected router: Router
  ) {

    this.activeRouteSnapshot$ = this.router.events.pipe(
      filter(ev => ev instanceof ActivationEnd),
      throttleTime(50),
      map(ev => (ev as ActivationEnd).snapshot)
    );

    this.currentPageName$ = this.activeRouteSnapshot$.pipe(
      map(snap => snap.data.title as string)
    );
  }

  public switchSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
    localStorage.setItem('ngNewBazaar.sidenavOpen', this.isSidenavOpen ? 'true' : 'false' );
    this.isSidenavOpenSource.next(this.isSidenavOpen);
  }

  ngOnDestroy(): void {
    this.isSidenavOpenSource.complete();
  }
}
