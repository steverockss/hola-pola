import {ProductImage} from "app/core/models/productImage.model";
export class Product {
  id: number;
  category: {
    categoryId: string;
    name: string;
  };
  total: number;
  unitaryPrice: number;
  quantity: number;
  unit: string;
  description: string;
  hidden: boolean;
  name: string;
  rate: number;
  images: ProductImage[];
  constructor(
    category: {
      categoryId: string;
      name: string;
    },
    description: string,
    hidden: boolean,
    name: string,
    quantity: number,
    unit: string,
    total: number,
    unitaryPrice: number,
    images: ProductImage[],
  ) {
    this.category = category;
    this.description = description;
    this.hidden = hidden;
    this.name = name;
    this.quantity = quantity;
    this.unit = unit;
    this.total = total;
    this.unitaryPrice = unitaryPrice;
    this.images = images
  }
  
}
