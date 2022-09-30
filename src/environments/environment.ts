// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  NEWS_LETTER_URL: 'https://storefront-features.herokuapp.com/',
  BASE_URL: 'https://testapi.cudigo.com/api/v7.0/mall/',
  trackingId: '',
  // BASE_URL: 'https://api.cudigo.com/api/v7.0/mall/',
  ADMIN_BASE_URL: 'https://testapi.cudigo.com/api/v3.0/dashboard/',
  firebase: {
    apiKey: 'AIzaSyBs6rR20sZEOIFlq5b0XV97D5DXjgP1a1w',
    authDomain: 'kudigo-b891c.firebaseapp.com',
    databaseURL: 'https://kudigo-b891c.firebaseio.com',
    projectId: 'kudigo-b891c',
    storageBucket: 'kudigo-b891c.appspot.com',
    messagingSenderId: '129573425499'
  },
  STACK_KEY: '7efad8a35b5ac5964d3ca586a1447736',
  API_KEY: 'AIzaSyBvsM5zhMYmsVprrTV4O_P7VwoZz8snmu0',
  PROTOCOL: 'https://',
  STOREFRONTMALL_URL: 'kudigoretail.com',
  pluto: 'plutocratsent'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
