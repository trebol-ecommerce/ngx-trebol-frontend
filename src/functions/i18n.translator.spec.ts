import { labelWasNotFoundMesage } from 'src/app/constants/i18n.constants';
import { labelsKeys, languages } from 'src/app/models/i18n.models';
import {
  COMMON_WARNING_MESSAGE,
  LOGIN_ERROR_MESSAGE,
  LOGIN_SUCCESS_MESSAGE,
  LOGOUT_MESSAGE,
  UNKNOWN_ERROR_MESSAGE,
} from 'src/text/messages';
import { i18nTranslator } from './i18n.translator';

describe('#i18nTranslator', () => {
  it('should return translated word work known label and language', () => {
    expect(i18nTranslator(labelsKeys.commonWarning, languages.sp)).toBe(
      COMMON_WARNING_MESSAGE
    );
    expect(i18nTranslator(labelsKeys.loginSuccess, languages.sp)).toBe(
      LOGIN_SUCCESS_MESSAGE
    );
    expect(i18nTranslator(labelsKeys.loginError, languages.sp)).toBe(
      LOGIN_ERROR_MESSAGE
    );
    expect(i18nTranslator(labelsKeys.unknownError, languages.sp)).toBe(
      UNKNOWN_ERROR_MESSAGE
    );
    expect(i18nTranslator(labelsKeys.logout, languages.sp)).toBe(
      LOGOUT_MESSAGE
    );
  });

  it('should return not found label message if passed label/language was not found', () => {
    expect(i18nTranslator('not supported label' as labelsKeys)).toBe(
      labelWasNotFoundMesage
    );

    expect(i18nTranslator(labelsKeys.logout, 'not supported language')).toBe(
      labelWasNotFoundMesage
    );
  });
});
