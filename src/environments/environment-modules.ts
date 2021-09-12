import { LocalMemoryDataModule } from 'src/app/api/local-memory/data.local-memory-api.module';
import { LocalMemorySessionApiModule } from 'src/app/api/local-memory/session.local-memory-api.module';
import { LocalMemoryStoreApiModule } from 'src/app/api/local-memory/store.local-memory-api.module';

export const environmentModules = [
  LocalMemoryDataModule,
  LocalMemorySessionApiModule,
  LocalMemoryStoreApiModule,
  // HttpDataApiModule,
  // HttpSessionApiModule,
  // HttpStoreApiModule
];
