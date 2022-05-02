import { Address } from './entities/Address';
import { BillingCompany } from './entities/BillingCompany';

export class BillingDetails {
  typeName: string;
  company?: BillingCompany;
  address?: Address;
}
