import { Address } from './entities/Address';

export class ShippingDetails {
  included: boolean;
  address?: Address;
}
