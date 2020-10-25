export enum labelsKeys {
  commonWarning = 'commonWarning',
  unknownError = 'unknownError',
  loginSuccess = 'loginSuccess',
  loginError = 'loginError',
  logout = 'logout',
}

export enum languages {
  sp = 'sp',
  en = 'en',
}

export type LabelsMap = {
  [label in labelsKeys]: string;
};

export type Labels = { default: LabelsMap } & {
  [language in languages]: LabelsMap;
};
