import { Component } from '@angular/core';

@Component({
  selector: 'app-store-footer',
  templateUrl: './store-footer.component.html',
  styleUrls: ['./store-footer.component.css']
})
export class StoreFooterComponent {

  public footerText = 'Todos los derechos reservados';

  constructor() { }
}
