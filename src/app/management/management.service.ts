import { Inject, Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SessionDataIService } from 'src/data/services/auth.data.iservice';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { AppUserService } from '../app-user.service';

@Injectable()
export class ManagementService
  implements OnDestroy {

  protected isSidenavOpen: boolean = (localStorage.getItem('ngNewBazaar.sidenavOpen') === 'false') ? false : true;
  protected isSidenavOpenSource: Subject<boolean> = new BehaviorSubject(this.isSidenavOpen);

  public isSidenavOpen$: Observable<boolean> = this.isSidenavOpenSource.asObservable();
  public currentPageName$: Observable<string>;

  constructor(
    @Inject(DATA_INJECTION_TOKENS.sessions) protected authDataService: SessionDataIService,
    protected appUserService: AppUserService,
    protected router: Router
  ) {
    this.currentPageName$ = this.router.events.pipe(
      filter((ev: RouterEvent) => ev instanceof NavigationEnd),
      map((ev: NavigationEnd) => ev.urlAfterRedirects)
    );
  }

  public switchSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
    localStorage.setItem('ngNewBazaar.sidenavOpen', this.isSidenavOpen ? 'true' : 'false' );
    this.isSidenavOpenSource.next(this.isSidenavOpen);
  }

  ngOnDestroy(): void {
    this.isSidenavOpenSource.complete();
    // protected alCambiarSesion(): void {
    //   if (!this.authService.sesion) {
    //     this.router.navigateByUrl('/store');
    //   }
    // }
  }
}
