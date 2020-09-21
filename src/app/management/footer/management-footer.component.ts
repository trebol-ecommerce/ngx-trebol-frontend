import { Component } from '@angular/core';

@Component({
  selector: 'app-management-footer',
  templateUrl: './management-footer.component.html',
  styleUrls: ['./management-footer.component.css']
})
export class ManagementFooterComponent {

  public footerText = 'Todos los derechos reservados.';

  constructor() { }

}
