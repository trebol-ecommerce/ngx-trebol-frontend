import { LocalMemoryApiModule } from 'src/app/api/local-memory/local-memory-api.module';
//import { HttpApiModule } from 'src/app/api/http/http-api.module';

export const environmentModules = [
  LocalMemoryApiModule,
  // HttpApiModule,
];
