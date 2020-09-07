import { Component } from '@angular/core';

@Component({
  selector: 'app-management-footer',
  templateUrl: './management-footer.component.html',
  styleUrls: ['./management-footer.component.css']
})
export class ManagementFooterComponent {

  public footerText = 'New Bazaar 2020 - Todos los derechos reservados.';

  constructor() { }

}
