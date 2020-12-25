export class Registration {
  public name: string;
  public password: string;
  public profile: RegistrationProfile;
}

class RegistrationProfile {
  public name: string;
  public idCard: string;
  public email: string;
  public address: string;
  public phone1: number;
  public phone2: number;
}
