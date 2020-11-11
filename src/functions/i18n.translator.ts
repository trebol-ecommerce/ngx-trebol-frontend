import {
  userLanguage,
  labels,
  labelWasNotFoundMesage,
} from '../app/i18n/i18n.constants';
import { labelsKeys } from 'src/app/i18n/i18n.models';

export const i18nTranslator = (
  label: labelsKeys,
  language: string = userLanguage
) => (labels[language] && labels[language][label]) || labelWasNotFoundMesage;
