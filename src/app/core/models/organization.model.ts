import { ProductImage } from "app/core/models/productImage.model";
import {Headquarters} from "app/core/models/headquarters.model";
import {ContactInfo} from "app/core/models/contactInfo.model"
import {OrganizationInfo} from "app/core/models/organizationInfo.model";
export class Organization {
  username: string;
  firstName: string;
  documentType: string;
  documentNumber: string;
  email: string;
  userState: number;
  mobilePhone: string;
  phone: number;
  password: string;
  hidden: boolean;
  logo: ProductImage;
  images: ProductImage[];
  organizationCategory: {
    categoryId: string;
    name: string;
  };
  organizationType: {
    typeId: string;
    name: string;
  };
  headquarters: Headquarters[]
  contactInfo: ContactInfo[]
  organizationInfo: OrganizationInfo[]

  constructor(
    username: string,
    firstName: string,
    documentType: string,
    documentNumber: string,
    email: string,
    mobilePhone: string,
    phone: number,
    password: string,

    organizationCategory: {
      categoryId: string;
      name: string;
    },
    organizationType: {
      typeId: string;
      name: string;
    },
    hidden: boolean,
    logo: ProductImage
  ) {
    this.username = username;
    this.firstName = firstName;
    this.documentType = documentType;
    this.documentNumber = documentNumber;
    this.email = email;
    this.mobilePhone = mobilePhone;
    this.phone = phone;
    this.password = password;
    (this.organizationCategory = organizationCategory),
      (this.organizationType = organizationType);
    this.hidden = hidden;
    this.logo = logo;
  }
}
