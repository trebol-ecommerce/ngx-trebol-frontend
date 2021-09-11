import { LocalMemoryDataModule } from 'src/app/api/local-memory/local-memory-data-api.module';
import { LocalMemorySessionApiModule } from 'src/app/api/local-memory/local-memory-session-api.module';
import { LocalMemoryStoreApiModule } from 'src/app/api/local-memory/local-memory-store-api.module';

export const environmentModules = [
  LocalMemoryDataModule,
  LocalMemorySessionApiModule,
  LocalMemoryStoreApiModule,
  // HttpDataApiModule,
  // HttpSessionApiModule,
  // HttpStoreApiModule
];
