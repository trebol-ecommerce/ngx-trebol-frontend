import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavModuleItemMetadata } from './SidenavModuleItemMetadata';
import { SidenavModuleItem } from './SidenavModuleItem';

const META_MODULOS: { [key: string]: SidenavModuleItemMetadata } = {
  dashboard: {
    title: 'Resumen',
    materialIconName: 'home'
  },
  clients: {
    title: 'Clientes',
    materialIconName: 'person'
  },
  employees: {
    title: 'Empleados',
    materialIconName: 'work'
  },
  products: {
    title: 'Productos',
    materialIconName: 'store'
  },
  providers: {
    title: 'Proveedores',
    materialIconName: 'rv_hookup'
  },
  sales: {
    title: 'Ventas',
    materialIconName: 'attach_money'
  },
  purchase_orders: {
    title: 'Ords. Compra',
    materialIconName: 'assignment'
  },
  users: {
    title: 'Usuarios',
    materialIconName: 'perm_identity'
  }
};

@Component({
  selector: 'app-management-sidenav',
  templateUrl: './management-sidenav.component.html',
  styleUrls: ['./management-sidenav.component.css']
})
export class ManagementSidenavComponent {

  public baseModule = 'management';
  public modules: SidenavModuleItem[];

  constructor(
    protected router: Router
  ) {
    this.modules = this.generateModuleList();
  }

  protected generateModuleList(): SidenavModuleItem[] {

    const r2 = this.router.config.filter(
      route => route.path === this.baseModule
    )[0].children.filter(
      route => 'component' in route
    );

    console.log(r2);


    return r2.map(
      (r) => {
        const meta = META_MODULOS[r.path];
        const protoModulo: SidenavModuleItem = {
          path: r.path,
          text: meta.title,
          icon: meta.materialIconName,
          active: false
        };
        return protoModulo;
      }
    );
  }

  public onClickNavigate(indice: number) {
    const item = this.modules[indice];
    this.modules.forEach(m => m.active = false);
    item.active = true;
  }

}
