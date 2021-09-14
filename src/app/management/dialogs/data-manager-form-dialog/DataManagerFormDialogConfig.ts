import { MatDialogConfig } from '@angular/material/dialog';
import { DataManagerFormDialogData } from './DataManagerFormDialogData';

export class DataManagerFormDialogConfig<T>
  extends MatDialogConfig {

  data: DataManagerFormDialogData<T>;
}
