import { Component } from '@angular/core';

export const TITLE = 'New Bazaar';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title: string = TITLE;

  constructor() {

  }

}
