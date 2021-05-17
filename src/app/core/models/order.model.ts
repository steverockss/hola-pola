import { CartItem } from "app/core/models/cartItem";
export class Order {
  address: string;
  buyer: {
    documentNumber: string;
  };
  comments: string;
  products: CartItem[];
  seller: {
    documentNumber: string;
  };
  shippingCost: number;
  totalCost: number;
  constructor(
    address: string,
    comments: string,
    buyer: {
      documentNumber: string;
    },
    products: CartItem[],
    seller: {
      documentNumber: string;
    },
    shippingCost: number,
    totalCost: number
  ) {
      this.address = address,
      this.buyer = buyer,
      this.products = products,
      this.seller = seller,
      this.shippingCost = shippingCost,
      this.totalCost = totalCost
      this.comments = comments
  }
}
