// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { name, version } from '../../package.json';

export const environment = {
  production: false,
  apiUrls: {
    access: '',
    account: '',
    data: '',
    public: ''
  },
  secrets: {
    sessionStorageTokenItem: 'trebol/bearer-token',
    tokenHttpHeader: 'Authorization'
  },
  labels: {
    name: 'Trébol',
    footerParagraphs: [
      `Trébol eCommerce demo site | ${name} v${version}`,
      'Made with ❤ using Angular 11 | Source code licensed under MIT'
    ],
    sellStatuses: {
      'Delivery Complete': 'Completado',
      'Delivery On Route': 'En Ruta',
      'Paid, Confirmed': 'Confirmado',
      'Paid, Unconfirmed': 'Pagado',
      'Payment Started': 'Por Pagar',
      Pending: 'No Iniciada',
      'Payment Cancelled' : 'Pago Cancelado',
      'Payment Failed': 'Pago Fallido',
      Rejected: 'Rechazado',
      'Delivery Cancelled': 'Entrega Cancelada',
      'Delivery Failed': 'Entrega Fallida',
      Returned: 'Devuelto'
    },
    sellTypes: {
      Bill: 'Boleta',
      'Enterprise Invoice': 'Factura'
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
