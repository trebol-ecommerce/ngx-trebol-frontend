import { Labels, languages, labelsKeys } from './i18n.models';
import {
  COMMON_WARNING_MESSAGE,
  UNKNOWN_ERROR_MESSAGE,
  LOGIN_SUCCESS_MESSAGE,
  LOGIN_ERROR_MESSAGE,
  LOGOUT_MESSAGE,
} from '../../text/messages';

export const labelWasNotFoundMesage = 'the label was not found';

// form lang from user client: navigator.languages -> [en-GB", "en-US", "en"];
export const userLanguage =
  navigator && navigator.languages
    ? navigator.languages[0].split('-')[0]
    : 'default';

export const labels: Labels = {
  default: {
    [labelsKeys.commonWarning]: COMMON_WARNING_MESSAGE,
    [labelsKeys.unknownError]: UNKNOWN_ERROR_MESSAGE,
    [labelsKeys.loginSuccess]: LOGIN_SUCCESS_MESSAGE,
    [labelsKeys.loginError]: LOGIN_ERROR_MESSAGE,
    [labelsKeys.logout]: LOGOUT_MESSAGE,
  },
  [languages.sp]: {
    [labelsKeys.commonWarning]: COMMON_WARNING_MESSAGE,
    [labelsKeys.unknownError]: UNKNOWN_ERROR_MESSAGE,
    [labelsKeys.loginSuccess]: LOGIN_SUCCESS_MESSAGE,
    [labelsKeys.loginError]: LOGIN_ERROR_MESSAGE,
    [labelsKeys.logout]: LOGOUT_MESSAGE,
  },
  [languages.en]: {
    [labelsKeys.commonWarning]:
      'There was an error processing. Please try again.',
    [labelsKeys.unknownError]: 'Unknown error, please try later',
    [labelsKeys.loginSuccess]: 'You have successfully logged in',
    [labelsKeys.loginError]: 'Invalid credentials',
    [labelsKeys.logout]: 'You have finished your session successfully',
  },
};
