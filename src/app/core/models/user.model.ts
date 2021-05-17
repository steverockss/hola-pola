export class User {
  user: {
    id: number;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    documentType: number;
    documentNumber: string;
    email: string;
    mobilePhone: string;
    phone: string;
    roles: [string];
    loginAttempts: number;
    userState: number;
    expiredPassword: boolean;
  };
  organization: string;
  buyer: string;
  token: string;
}
