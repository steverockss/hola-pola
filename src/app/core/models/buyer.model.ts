export class Buyer {
  address: string;
  addressDescription: string;
  username: string;
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  email: string;
  mobilePhone: string;
  phone: string;
  password: string;
  state: {
    stateId: string;
    name: string;
  };
  city: {
    cityId: string;
    name: string;
  };
  constructor(
    address: string,
    addressDescription: string,
    username: string,
    firstName: string,
    lastName: string,
    documentType: string,
    documentNumber: string,
    email: string,
    mobilePhone: string,
    phone: string,
    password: string,
    
    state: {
      stateId: string;
      name: string;
    },
    city: {
      cityId: string;
      name: string;
    }
  ) {
      this.address = address,
      this.addressDescription = addressDescription,
      this.username = username,
      this.firstName = firstName,
      this.lastName = lastName,
      this.documentType = documentType,
      this.documentNumber = documentNumber,
      this.email = email,
      this.mobilePhone = mobilePhone,
      this.phone = phone,
      this.password = password,
      this.state = state,
      this.city = city
  }
}
