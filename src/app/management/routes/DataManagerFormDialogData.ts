import { AbstractEntity } from 'src/app/models/AbstractEntity';

export interface DataManagerFormDialogData<T extends AbstractEntity> {
  item: T;
}
