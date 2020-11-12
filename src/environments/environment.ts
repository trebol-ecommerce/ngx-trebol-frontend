// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { LocalMemoryDataModule } from 'src/app/api/data-mgt/local-memory/local-memory-data.module';
import { LocalMemorySessionApiModule } from 'src/app/api/session/local-memory/local-memory-session-api.module';
import { LocalMemoryStoreApiModule } from 'src/app/api/store/local-memory/local-memory-store-api.module';

export const environment = {
  production: false,
  dataModule: LocalMemoryDataModule,
  authModule: LocalMemorySessionApiModule,
  storeModule: LocalMemoryStoreApiModule,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
