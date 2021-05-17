export class Seller {
  id: string;
  username: string;
  firstName: string;
  lastname: string;
  documentType: string;
  documentNumber: string;
  email: string;

  sellerInfo: {
    minimumOrder: number,
    shippingCoverage: string,
    estimatedShippingCost: number,
    totalSales: number,
    blocked: boolean
};
  logo: {
    id: string,
    organizationId: string,
    alternativeText: string,
    url: string,
    fileName: string,
    encodedContent: string
  };
  mobilePhone: string;
  phoneNumber: string;
}