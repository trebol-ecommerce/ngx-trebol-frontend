# New Bazaar App
# Español
Un completo sistema de venta e inventario web, escrito pensando en flexibilidad y portabilidad de código.

`/src/app/` - Los componentes, sus plantillas y código fuente de la aplicación en general.
`/src/data/` - Punto de inicio donde se declara la API que la app consume. 
  `models/` - Las clases del modelo de datos. Casi todas extienden de la clase `AbstractEntity`
  `services/` - Interfaces de servicios, y módulos con proveedores de implementaciones para éstas. Dichos servicios se usan en la aplicación por medio de tokens de inyección, declarados en `data-injection-tokens.ts`.
    `local-memory/` provee servicios que trabajan con datos en la memoria virtual del navegador. Funcionan bien en la medida que no se recargue la página.
    `http/` provee servicios que se apoyan en el servicio `HttpClient` de Angular para obtener los datos de la API desde un servidor externo.
    

Este proyecto fue generado usando [la interfaz de comandos de Angular](https://github.com/angular/angular-cli) en la v7.3.9.
Se ha migrado a la v9.1.9 siguiendo [la guía oficial de actualización](https://update.angular.io/).
