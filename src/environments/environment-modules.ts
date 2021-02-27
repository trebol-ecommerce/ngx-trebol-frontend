import { LocalMemoryDataModule } from 'src/app/api/data/local-memory/local-memory-data-api.module';
import { LocalMemorySessionApiModule } from 'src/app/api/session/local-memory/local-memory-session-api.module';
import { LocalMemoryStoreApiModule } from 'src/app/api/store/local-memory/local-memory-store-api.module';

export const environmentModules = [
  LocalMemoryDataModule,
  LocalMemorySessionApiModule,
  LocalMemoryStoreApiModule,
  // HttpDataApiModule,
  // HttpSessionApiModule,
  // HttpStoreApiModule
];
