import { State } from "./state.model";
import { City } from "./city.model";
export class Headquarters {
  address: string;
  addressDescription: string;
  city: City;
  state: State;
  type: string;
  constructor(
    address: string,
    addressDescription: string,
    city: City,
    state: State,
    type: string
  ) {
      this.address = address,
      this.addressDescription = addressDescription,
      this.city = city,
      this.state = state,
      this.type = type
  }
}
