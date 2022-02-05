// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  googleMapsId: '',
  whatsapp: {
    enabled: false,
    areaCode: '+56',
    phone: '9 9999 9999',
    urlSafePhone: '999999999'
  },
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
      `Trébol eCommerce demo site`,
      'Made with ❤ using Angular 12 | Source code licensed under MIT'
    ]
  },
  constraints: {
    maxIntegerValue: 2147483647
  },
  staticImages: {
    topBanners: [
      {
        filename: 'banner-A.png',
        url: 'https://fakeimg.pl/1200x450',
        targetUrl: '/store/search?categoryCode=90f4-5d9395ed3c75'
      },
      {
        filename: 'banner-B.png',
        url: 'https://fakeimg.pl/1200x450',
        targetUrl: '/store/search?categoryCode=8381-f3d0ea2535f5'
      },
      {
        filename: 'banner-C.png',
        url: 'https://fakeimg.pl/1200x450',
        targetUrl: '/store/search?categoryCode=aa56-96c85823cd86'
      }
    ],
    bottomBanners: [
      {
        filename: 'BANNER-1.png',
        url: 'https://fakeimg.pl/600x100',
        targetUrl: undefined
      },
      {
        filename: 'BANNER-2.png',
        url: 'https://fakeimg.pl/600x100',
        targetUrl: undefined
      },
      {
        filename: 'BANNER-3.png',
        url: 'https://fakeimg.pl/600x100',
        targetUrl: undefined
      },
    ]
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
